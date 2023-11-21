function Menu() {
  const [showOrders, setShowOrders] = React.useState(true);
  const [showTasks, setShowTasks] = React.useState(false);

  const handleOrdersClick = () => {
    setShowOrders(true);
    setShowTasks(false);
  };

  const handleTasksClick = () => {
    setShowOrders(false);
    setShowTasks(true);
  };

  const handleLogoutClick = () => {
    window.location.href = '/login';
  };

  return (
    <div>
      <div className="Logout" onClick={handleLogoutClick}>
        Logout
      </div>
      <div className="menu">
        <div onClick={handleOrdersClick} className={showOrders ? "active" : ""}>Orders</div>
        <div onClick={handleTasksClick} className={showTasks ? "active" : ""}>Tasks</div>
      </div>
      <div id="content">
        {showOrders && <OrdersList />}
        {showTasks && <TasksList />}
      </div>

    </div>
  );
};

const root = document.getElementById('root');
const rootElement = ReactDOM.createRoot(root);
rootElement.render(<Menu />);
