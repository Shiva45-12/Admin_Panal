import { useState, useEffect } from "react";
import { MdPayment, MdAdd, MdRemove, MdDelete, MdShoppingCart, MdCreditCard, MdAccountBalanceWallet, MdMoney, MdHistory, MdVisibility } from "react-icons/md";
import Swal from "sweetalert2";
import "./Payment.css";

export default function Payment({ onPaymentUpdate }) {
  const [products] = useState([
    { id: 1, name: "Fresh Milk", price: 60, unit: "liter", stock: 50 },
    { id: 2, name: "Greek Yogurt", price: 120, unit: "kg", stock: 30 },
    { id: 3, name: "Pure Ghee", price: 800, unit: "kg", stock: 20 },
    { id: 4, name: "Buttermilk", price: 40, unit: "liter", stock: 25 },
    { id: 5, name: "Paneer", price: 300, unit: "kg", stock: 15 },
    { id: 6, name: "Heavy Cream", price: 150, unit: "liter", stock: 20 }
  ]);

  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    loadPaymentHistory();
  }, []);

  const loadPaymentHistory = () => {
    const payments = JSON.parse(localStorage.getItem('payments') || '[]');
    setPaymentHistory(payments.reverse()); // Show latest first
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    const coupons = {
      'SAVE20': { discount: 20, type: 'percentage', minAmount: 100 },
      'FLAT50': { discount: 50, type: 'fixed', minAmount: 200 },
      'DAIRY10': { discount: 10, type: 'percentage', minAmount: 50 }
    };

    const coupon = coupons[couponCode.toUpperCase()];
    if (coupon && getSubtotal() >= coupon.minAmount) {
      const discountAmount = coupon.type === 'percentage' 
        ? (getSubtotal() * coupon.discount) / 100
        : coupon.discount;
      setDiscount(discountAmount);
      Swal.fire('Success!', `Coupon applied! You saved ₹${discountAmount}`, 'success');
    } else {
      Swal.fire('Error!', 'Invalid coupon or minimum amount not met', 'error');
      setDiscount(0);
    }
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotal = () => {
    return getSubtotal() - discount;
  };

  const processPayment = async () => {
    if (cart.length === 0) {
      Swal.fire('Error!', 'Cart is empty', 'error');
      return;
    }

    if (!customerInfo.name || !customerInfo.phone) {
      Swal.fire('Error!', 'Please fill customer details', 'error');
      return;
    }

    const result = await Swal.fire({
      title: 'Process Payment?',
      html: `
        <div style="text-align: left;">
          <p><strong>Customer:</strong> ${customerInfo.name}</p>
          <p><strong>Phone:</strong> ${customerInfo.phone}</p>
          <p><strong>Items:</strong> ${cart.length}</p>
          <p><strong>Subtotal:</strong> ₹${getSubtotal()}</p>
          <p><strong>Discount:</strong> ₹${discount}</p>
          <p><strong>Total:</strong> ₹${getTotal()}</p>
          <p><strong>Payment Method:</strong> ${paymentMethod}</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Process Payment'
    });

    if (result.isConfirmed) {
      // Save payment record
      const paymentRecord = {
        id: Date.now(),
        customer: customerInfo,
        items: cart,
        subtotal: getSubtotal(),
        discount: discount,
        total: getTotal(),
        paymentMethod: paymentMethod,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString()
      };

      // Store payment in localStorage
      const existingPayments = JSON.parse(localStorage.getItem('payments') || '[]');
      existingPayments.push(paymentRecord);
      localStorage.setItem('payments', JSON.stringify(existingPayments));

      // Trigger dashboard update
      if (onPaymentUpdate) onPaymentUpdate();
      window.dispatchEvent(new Event('paymentUpdate'));

      // Reload payment history
      loadPaymentHistory();

      // Clear form
      setCart([]);
      setCustomerInfo({ name: '', phone: '', email: '' });
      setDiscount(0);
      setCouponCode('');
      
      Swal.fire('Success!', 'Payment processed successfully!', 'success');
    }
  };

  const viewPaymentDetails = (payment) => {
    const itemsList = payment.items.map(item => 
      `${item.name} x${item.quantity} = ₹${item.price * item.quantity}`
    ).join('<br>');

    Swal.fire({
      title: `Payment #${payment.id}`,
      html: `
        <div style="text-align: left;">
          <p><strong>Customer:</strong> ${payment.customer.name}</p>
          <p><strong>Phone:</strong> ${payment.customer.phone}</p>
          <p><strong>Date:</strong> ${payment.date} at ${payment.time}</p>
          <p><strong>Payment Method:</strong> ${payment.paymentMethod}</p>
          <hr>
          <p><strong>Items:</strong></p>
          <div style="margin-left: 10px;">${itemsList}</div>
          <hr>
          <p><strong>Subtotal:</strong> ₹${payment.subtotal}</p>
          <p><strong>Discount:</strong> ₹${payment.discount}</p>
          <p><strong>Total:</strong> ₹${payment.total}</p>
        </div>
      `,
      icon: 'info',
      confirmButtonText: 'Close'
    });
  };

  const deletePayment = async (paymentId) => {
    const result = await Swal.fire({
      title: 'Delete Payment?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Delete!'
    });

    if (result.isConfirmed) {
      const updatedPayments = paymentHistory.filter(payment => payment.id !== paymentId);
      localStorage.setItem('payments', JSON.stringify(updatedPayments.reverse()));
      
      // Trigger dashboard update
      if (onPaymentUpdate) onPaymentUpdate();
      window.dispatchEvent(new Event('paymentUpdate'));
      
      loadPaymentHistory();
      Swal.fire('Deleted!', 'Payment record has been deleted.', 'success');
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h2><MdPayment /> Payment Management</h2>
      </div>

      <div className="payment-content">
        <div className="products-section">
          <h3>Products</h3>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p className="product-price">₹{product.price}/{product.unit}</p>
                  <p className="product-stock">Stock: {product.stock}</p>
                </div>
                <button 
                  onClick={() => addToCart(product)} 
                  className="add-to-cart-btn"
                  disabled={product.stock === 0}
                >
                  <MdAdd /> Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-section">
          <div className="cart-header">
            <h3><MdShoppingCart /> Cart ({cart.length})</h3>
          </div>
          
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Cart is empty</p>
            </div>
          ) : (
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>₹{item.price}/{item.unit}</p>
                  </div>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <MdRemove />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <MdAdd />
                    </button>
                  </div>
                  <div className="item-total">
                    ₹{item.price * item.quantity}
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="remove-btn"
                  >
                    <MdDelete />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="customer-info">
            <h4>Customer Information</h4>
            <div className="customer-form">
              <input
                type="text"
                placeholder="Customer Name"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
              />
              <input
                type="email"
                placeholder="Email (Optional)"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
              />
            </div>
          </div>

          <div className="coupon-section">
            <h4>Apply Coupon</h4>
            <div className="coupon-form">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button onClick={applyCoupon} className="apply-coupon-btn">
                Apply
              </button>
            </div>
          </div>

          <div className="payment-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{getSubtotal()}</span>
            </div>
            {discount > 0 && (
              <div className="summary-row discount">
                <span>Discount:</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{getTotal()}</span>
            </div>
          </div>

          <div className="payment-method">
            <h4>Payment Method</h4>
            <div className="payment-options">
              <label className={`payment-option ${paymentMethod === 'cash' ? 'active' : ''}`}>
                <input
                  type="radio"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <MdMoney /> Cash
              </label>
              <label className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}>
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <MdCreditCard /> Card
              </label>
              <label className={`payment-option ${paymentMethod === 'upi' ? 'active' : ''}`}>
                <input
                  type="radio"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <MdAccountBalanceWallet /> UPI
              </label>
            </div>
          </div>

          <button 
            onClick={processPayment} 
            className="process-payment-btn"
            disabled={cart.length === 0}
          >
            Process Payment - ₹{getTotal()}
          </button>
        </div>
      </div>

      <div className="payment-history-section">
        <h3><MdHistory /> Payment History</h3>
        {paymentHistory.length === 0 ? (
          <div className="no-payments">
            <p>No payment history available</p>
          </div>
        ) : (
          <div className="payment-history-table">
            <table>
              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment Method</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr key={payment.id}>
                    <td>#{payment.id}</td>
                    <td>{payment.customer.name}</td>
                    <td>{payment.items.length} items</td>
                    <td>₹{payment.total}</td>
                    <td>
                      <span className="payment-method-badge">
                        {payment.paymentMethod}
                      </span>
                    </td>
                    <td>{payment.date}</td>
                    <td>
                      <div className="actions-container">
                        <button 
                          onClick={() => viewPaymentDetails(payment)} 
                          className="action-btn view-btn" 
                          title="View Details"
                        >
                          <MdVisibility style={{fontSize: '16px'}} />
                        </button>
                        <button 
                          onClick={() => deletePayment(payment.id)} 
                          className="action-btn delete-btn" 
                          title="Delete"
                        >
                          <MdDelete style={{fontSize: '16px'}} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}