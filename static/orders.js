function OrdersList() {
  const [orders, setOrders] = React.useState([]);
  const [filter, setFilter] = React.useState('');
  const [filteredOrders, setFilteredOrders] = React.useState([]);
  const [isHiddenOrder, setIsHiddenOrder] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const ordersResponse = await axios.get('/orderslist');
      const updatedOrders = ordersResponse.data.orders_list;
      setOrders(updatedOrders);

      const filtered = updatedOrders.filter(order =>
        filter === "" || 
        String(order[filter.name]).toLowerCase().startsWith(String(filter.value).toLowerCase())
      );      
      setFilteredOrders(filtered);
    };
    fetchData();
  }, [filter]);

  const handleOrdersFilterChange = (filterValue) => {
    setFilter(filterValue);
  };

  const toggleHiddenOrder = (orderId) => {
    if (isHiddenOrder.includes(orderId)) {
      setIsHiddenOrder(isHiddenOrder.filter((id) => id !== orderId));
    } else {
      setIsHiddenOrder([...isHiddenOrder, orderId]);
    }
  };

  return (
    <>
      <div className="orders_list">
        <div className="header">
          <div className="table-header">
            <TableHeaderOrders />
          </div>
          <div className="table-header">
            <TableFilterOrders handleOrdersFilterChange={handleOrdersFilterChange} />
          </div>
        </div>
        <div className="orders">
          {filteredOrders.map((item) => (
            <div key={item.id}>
              <Order order={item} toggleHiddenOrder={toggleHiddenOrder} />
              <div className="order_description">
                <OrderDescription order={item} isHiddenOrder={isHiddenOrder} setOrders={setOrders}/>
              </div>
            </div>
          ))}
        </div>
        <div className="table_order_footer">
          <AddOrder setOrders={setOrders} />
        </div>
      </div>
    </>
  );
};

function TableFilterOrders({ handleOrdersFilterChange }) {
  return (<div className="table_header_orders">
                <div className="order_id">id</div>

                <select
                  name="type_of_contract"
                  className="type_of_contract"
                  onChange={(event) => handleOrdersFilterChange({ name: event.target.name, value: event.target.value })}
                >
                  <option value="" className="filter-placeholder">Filter ...</option>
                  <option value="export">export</option>
                  <option value="import">import</option>
                  <option value="external">external</option>
                  <option value="internal">internal</option>
                </select>


                <input
                  name="departure_address"
                  className="departure_address"
                  placeholder="Filter..."
                  onChange={(event) => handleOrdersFilterChange({ name: event.target.name, value: event.target.value })}
                />

                <input
                  name="destination_address"
                  className="destination_address"
                  placeholder="Filter..."
                  onChange={(event) => handleOrdersFilterChange({ name: event.target.name, value: event.target.value })}
                />

                <input
                  name="product_common_description"
                  className="product_common_description"
                  placeholder="Filter..."
                  onChange={(event) => handleOrdersFilterChange({ name: event.target.name, value: event.target.value })}
                />

                <div className="total_gross_weight">weight</div>
                <div className="total_gross_volume">volume</div>

                <select
                  name="incoterms"
                  className="incoterms"
                  onChange={(event) => handleOrdersFilterChange({ name: event.target.name, value: event.target.value })}
                >
                  <option value="" className="filter-placeholder">Filter...</option>
                  <option value="EXW">EXW</option>
                  <option value="FOB">FOB</option>
                  <option value="FCA">FCA</option>
                  <option value="CPT">CPT</option>
                  <option value="CIF">CIF</option>
                  <option value="DDP">DDP</option>
                </select>

                <div className="total_invoice_value">invoice</div>
                <div className="invoice_currency">currency</div>
                <div className="total_cost">cost</div>
                <div className="total_revenue">revenue</div>

                <input
                  name="margin"
                  className="margin"
                  placeholder="Filter..."
                  onChange={(event) => handleOrdersFilterChange({ name: event.target.name, value: event.target.value })}
                />

                <input
                  name="name"
                  className="customer_name"
                  placeholder="Filter..."
                  onChange={(event) => handleOrdersFilterChange({ name: event.target.name, value: event.target.value })}
                />

                <input
                  name="contact_name"
                  className="contact_name"
                  placeholder="Filter..."
                  onChange={(event) => handleOrdersFilterChange({ name: event.target.name, value: event.target.value })}
                />

                <input
                  name="phone"
                  className="phone"
                  placeholder="Filter..."
                  onChange={(event) => handleOrdersFilterChange({ name: event.target.name, value: event.target.value })}
                />


                <input
                  name="email"
                  className="email"
                  placeholder="Filter..."
                  onChange={(event) => handleOrdersFilterChange({ name: event.target.name, value: event.target.value })}
                />

                <div className="date_of_order">date of order</div>

                <select
                  name="order_status"
                  className="order_status"
                  onChange={(event) => handleOrdersFilterChange({ name: event.target.name, value: event.target.value })}
                >
                  <option value="" className="filter-placeholder">Filter ...</option>
                  <option value="start">start</option>
                  <option value="negotiation">negotiation</option>
                  <option value="shipping">shipping</option>
                  <option value="completed">completed</option>
                </select>
            </div>
    )
};
  
function TableHeaderOrders() {
    return (<div className="table_header_orders">
                <div className="order_id">id</div>
                <div className="type_of_contract">type</div>
                <div className="departure_address">POL</div>
                <div className="destination_address">POD</div>
                <div className="product_common_description">product</div>
                <div className="total_gross_weight">weight</div>
                <div className="total_gross_volume">volume</div>
                <div className="incoterms">incoterms</div>
                <div className="total_invoice_value">invoice</div>
                <div className="invoice_currency">currency</div>
                <div className="total_cost">cost</div>
                <div className="total_revenue">revenue</div>
                <div className="margin">margin</div>
                <div className="customer_name">customer</div>
                <div className="contact_name">contact name</div>
                <div className="phone">phone</div>
                <div className="email">email</div>
                <div className="date_of_order">date of order</div>
                <div className="order_status">order status</div>
            </div>
    )
};

function Order({ order, toggleHiddenOrder }) {
  const isCompleted = order.order_status === 'completed';
    return (
        <div
            className={`order ${isCompleted ? 'completed' : ''}`}
            onClick={() => toggleHiddenOrder(order.id)}
            style={isCompleted ? { fontStyle: 'italic', fontWeight: 'lighter' } : {}}
        >
            <div className="order_id">{order.id}</div>
            <div className="type_of_contract">{order.type_of_contract}</div>
            <div className="departure_address">{order.departure_address}</div>
            <div className="destination_address">{order.destination_address}</div>
            <div className="product_common_description">{order.product_common_description}</div>
            <div className="total_gross_weight">{order.total_gross_weight}</div>
            <div className="total_gross_volume">{order.total_gross_volume}</div>
            <div className="incoterms">{order.incoterms}</div>
            <div className="total_invoice_value">{order.total_invoice_value}</div>
            <div className="invoice_currency">{order.invoice_currency}</div>
            <div className="total_cost">{order.total_cost}</div>
            <div className="total_revenue">{order.total_revenue}</div>
            <div className="margin">{order.margin}</div>
            <div className="customer_name">{order.name}</div>
            <div className="contact_name">{order.contact_name}</div>
            <div className="phone">{order.phone}</div>
            <div className="email">{order.email}</div>
            <div className="date_of_order">{order.date_of_order}</div>
            <div className="order_status">{order.order_status}</div>
        </div>
    );
};

function OrderDescription({ order, isHiddenOrder, setOrders }) {
    return (
        <div>
            {isHiddenOrder.includes(order.id) ? <OrderDescriptionMain order = {order} setOrders = {setOrders} /> : null}
        </div>
    );
};

function OrderDescriptionMain({order, setOrders}) {
  return (
    <>
      <AddOrderMain initialOrderValues={order} setOrders={setOrders} />
      <OrderTasksList tasks_order_id={order.id} />
    </>
  );
};

function AddOrderMain({ initialOrderValues = {
  customer_id: '',
  name: '',
  contact_name: '',
  phone: '',
  email: '',
  type_of_contract: '',
  departure_address: '',
  destination_address: '',
  product_common_description: '',
  total_gross_weight: '',
  total_gross_volume: '',
  incoterms: '',
  total_invoice_value: '',
  invoice_currency: '',
  total_cost: '',
  total_revenue: '',
  margin: '',
  date_of_order: '',
  order_status: ''},
   setOrders}) {
  const [orderData, setOrderData] = React.useState(initialOrderValues);
  const [isLoadingOrderData, setIsLoadingOrderData] = React.useState(false);

  const handleOrderInputChange = (dataOfOrder) => {
    const partialData = dataOfOrder.reduce((acc, item) => {
      acc[item.name] = item.value;
      return acc;
    }, {});
    setOrderData({
      ...orderData,
      ...partialData
    });
  };    
  
  const handleOrderSubmit = async (event) => {
    event.preventDefault();
    setIsLoadingOrderData(true);
  
    if (orderData.id) {
      axios.post('/update_order', orderData)
        .then(() => {
          setIsLoadingOrderData(false);
          resetOrderForm();
        });
    } else {
      axios.post('/add_order', orderData)
        .then(() => {
          setIsLoadingOrderData(false);
          resetOrderForm();
        });
    };
    const ordersResponse = await axios.get('/orderslist');
    const updatedOrders = ordersResponse.data.orders_list;
    console.log('updatedOrders - ',updatedOrders)
    setOrders(updatedOrders);
  };

  const resetOrderForm = () => {
    setOrderData({
      customer_id: '',
      name: '',
      contact_name: '',
      phone: '',
      email: '',
      type_of_contract: '',
      departure_address: '',
      destination_address: '',
      product_common_description: '',
      total_gross_weight: '',
      total_gross_volume: '',
      incoterms: '',
      total_invoice_value: '',
      invoice_currency: '',
      total_cost: '',
      total_revenue: '',
      margin: '',
      date_of_order: '',
      order_status: ''
    });
  };

  return (
    <>
      <form className="addorder" onSubmit={handleOrderSubmit}>
        <div className="ordercustomerinput">
          <div className="orderinput">

            <div className="orderlonginputs">
              <div className="add-input-container">
                <div className="input-label">Departure address:</div>
                <input
                  type="text"
                  name="departure_address"
                  className="add-departure_address"
                  onChange={(event) => handleOrderInputChange([{ name: event.target.name, value: event.target.value }])}
                  value={orderData.departure_address}
                />
              </div>

              <div className="add-input-container">
                <div className="input-label">Destination address:</div>
                <input
                  type="text"
                  name="destination_address"
                  className="add-destination_address"
                  onChange={(event) => handleOrderInputChange([{ name: event.target.name, value: event.target.value }])}
                  value={orderData.destination_address}
                />
              </div>

              <div className="add-input-container">
                <div className="input-label">Cargo description:</div>
                <input
                  type="text"
                  name="product_common_description"
                  className="add-product_common_description"
                  onChange={(event) => handleOrderInputChange([{ name: event.target.name, value: event.target.value }])}
                  value={orderData.product_common_description}
                />
              </div>

              <div className="add-input-container">
                <div className="input-label">Order status:</div>
                <select
                  name="order_status"
                  className="add-order_status"
                  onChange={(event) => handleOrderInputChange([{ name: event.target.name, value: event.target.value }])}
                  value={orderData.order_status}
                >
                  <option value=""></option>
                  <option value="start">start</option>
                  <option value="negotiation">negotiation</option>
                  <option value="shipping">shipping</option>
                  <option value="completed">completed</option>
                </select>
              </div>
            </div>

            <div className="ordershortinputs">
              <div className="add-input-container">
                <div className="input-label">Date of order:</div>
                  <input
                    type="date"
                    name="date_of_order"
                    className="add-date_of_order"
                    onChange={(event) => handleOrderInputChange([{ name: event.target.name, value: event.target.value }])}
                    value={
                      initialOrderValues.date_of_order
                        ? orderData.date_of_order
                        : new Date().toISOString().split('T')[0]
                    }
                    readOnly
                  />

              </div>

              <div className="add-input-container">
                <div className="input-label">Type of contract:</div>
                <select
                  name="type_of_contract"
                  className="add-type_of_contract"
                  onChange={(event) => handleOrderInputChange([{ name: event.target.name, value: event.target.value }])}
                  value={orderData.type_of_contract}
                >
                  <option value=""></option>
                  <option value="import">Import</option>
                  <option value="export">Export</option>
                  <option value="internal">Internal</option>
                  <option value="external">External</option>
                </select>
              </div>

              <div className="add-input-container">
                <div className="input-label">Gross weight, kg:</div>
                <input
                  type="number"
                  name="total_gross_weight"
                  className="add-total_gross_weight"
                  onChange={(event) => handleOrderInputChange([{ name: event.target.name, value: event.target.value }])}
                  value={orderData.total_gross_weight}
                />
              </div>

              <div className="add-input-container">
                <div className="input-label">Total volume, m3:</div>
                <input
                  type="number"
                  name="total_gross_volume"
                  className="add-total_gross_volume"
                  onChange={(event) => handleOrderInputChange([{ name: event.target.name, value: event.target.value }])}
                  value={orderData.total_gross_volume}
                />
              </div>

              <div className="add-input-container">
                <div className="input-label">Incoterms:</div>
                <select
                  name="incoterms"
                  className="add-incoterms"
                  onChange={(event) => handleOrderInputChange([{ name: event.target.name, value: event.target.value }])}
                  value={orderData.incoterms}
                >
                  <option value=""></option>
                  <option value="EXW">EXW</option>
                  <option value="FOB">FOB</option>
                  <option value="FCA">FCA</option>
                  <option value="CPT">CPT</option>
                  <option value="CFR">CFR</option>
                  <option value="CIF">CIF</option>
                  <option value="DDP">DDP</option>
                </select>
              </div>

              <div className="add-input-container">
                <div className="input-label">Total invoice value:</div>
                <input
                  type="number"
                  name="total_invoice_value"
                  className="add-total_invoice_value"
                  onChange={(event) => handleOrderInputChange([{ name: event.target.name, value: event.target.value }])}
                  value={orderData.total_invoice_value}
                />
              </div>

              <div className="add-input-container">
                <div className="input-label">Invoice currency:</div>
                <select
                  name="invoice_currency"
                  className="add-invoice_currency"
                  onChange={(event) => handleOrderInputChange([{ name: event.target.name, value: event.target.value }])}
                  value={orderData.invoice_currency}>
                  <option value=""></option>
                  <option value="ILS">ILS</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="CNY">CNY</option>
                  <option value="RUB">RUB</option>
                </select>
              </div>

              <div className="add-input-container">
                <div className="input-label">Total cost:</div>
                <input
                  type="number"
                  name="total_cost"
                  className="add-total_cost"
                  onChange={(event) => handleOrderInputChange([{ name: event.target.name, value: event.target.value }])}
                  value={orderData.total_cost}
                />
              </div>

              <div className="add-input-container">
                <div className="input-label">Total revenue:</div>
                <input
                  type="number"
                  name="total_revenue"
                  className="add-total_revenue"
                  onChange={(event) => handleOrderInputChange([{ name: event.target.name, value: event.target.value }])}
                  value={orderData.total_revenue}
                />
              </div>

              <div className="add-input-container">
                <div className="input-label">Margin:</div>
                <input
                  type="number"
                  name="margin"
                  className="add-margin"
                  onChange={(event) => handleOrderInputChange([{ name: event.target.name, value: event.target.value }])}
                  value={orderData.margin}
                />
              </div>
            </div>

          </div>

          <div className="customerinput">
            <div className="add-input-container">
                <div className="input-label">Customer name:</div>
                <CompanySearch onChange={handleOrderInputChange} initionalName={initialOrderValues.name} />
            </div>
              
            <div className="add-input-container">
              <div className="input-label">Contact name:</div>
              <input
                type="text"
                name="contact_name"
                className="add-contact_name"
                onChange={(event) => handleOrderInputChange([{ name: event.target.name, value: event.target.value }])}
                value={orderData.contact_name}
              />
            </div>

            <div className="add-input-container">
              <div className="input-label">Phone:</div>
              <input
                type="text"
                name="phone"
                className="add-phone"
                onChange={(event) => handleOrderInputChange([{ name: event.target.name, value: event.target.value }])}
                value={orderData.phone}
              />
            </div>

            <div className="add-input-container">
              <div className="input-label">e-mail:</div>
              <input
                type="text"
                name="email"
                className="add-email"
                onChange={(event) => handleOrderInputChange([{ name: event.target.name, value: event.target.value }])}
                value={orderData.email}
              />
            </div>
          </div>
        </div>

        <input type="submit" className="submit_order" name="submit_order" disabled={isLoadingOrderData} />
      </form>
    </>
  )
};

function OrderTasksList({ tasks_order_id }) {
  const [tasks, setTasks] = React.useState([]);
  const [isLoadingTasks, setIsLoadingTasks] = React.useState(true);

  const fetchData = async () => {
    try {
      const tasksResponse = await axios.get(`/tasks?id=${tasks_order_id}`);
      if (tasksResponse && tasksResponse.data && tasksResponse.data.tasks && tasksResponse.data.tasks.length > 0) {
        const sortedTasks = tasksResponse.data.tasks.slice().sort((a, b) => {
          const dateA = new Date(a.execution_date);
          const dateB = new Date(b.execution_date);
          if (dateA > dateB) { return -1; }
          if (dateA < dateB) { return 1; }
          return 0;
          
        });
        setTasks(sortedTasks);
      } else {
        console.error("No tasks data available for sorting.");
      };
      setIsLoadingTasks(false);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);  

  if (isLoadingTasks) {
    return <p>Loading tasks list...</p>;
  };

  return (
    <>
      <div className="tasks_list">
        <div>
          <AddOrderTask tasks_order_id={tasks_order_id} />
        </div>
        <div className="tasks_header">
          <div className="tasks_table_header">
            <TableHeaderOrderTasks />
          </div>
        </div>
        <div className="tasks">
          {tasks.map((item) => (
            <div key={item.id} >
              <OrderTask task={item} />
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

function TableHeaderOrderTasks() {
  return (<div className="table_header_tasks">
              <div className="description">Description</div>
              <div className="date_of_issue">Date of task issue</div>
              <div className="execution_date">Execution task date</div>
              <div className="execition_time">Execition tas time</div>
              <div className="importance">Task importance</div>
              <div className="completedtask">Completed</div>
          </div>
  )
};

function OrderTask({ task }) {
  return (
      <div className="task" >
          <div className="description">{task.description}</div>
          <div className="date_of_issue">{task.date_of_issue}</div>
          <div className="execution_date">{task.execution_date}</div>
          <div className="execition_time">{task.execution_time}</div>
          <div className="importance">{task.importance}</div>
          <div className="completedtask">
            {task.completed === 1 ? 'completed' : 'in progress'}
          </div>

      </div>
  );
};

function AddOrderTask ( {tasks_order_id} ) {
  const [isHiddenOrderTask, setIsHiddenOrderTask] = React.useState(false);

  const toggleHiddenOrderTask = () => {
    setIsHiddenOrderTask(!isHiddenOrderTask);
  };
  
  return (
      <>
          <AddOrderTaskLink toggleHiddenOrderTask={toggleHiddenOrderTask}/>
          <div className="AddOrderTaskProcess">
            <AddOrderTaskProcess  isHiddenOrderTask={isHiddenOrderTask} tasks_order_id={tasks_order_id}/>
          </div>
      </>
  );
};

function AddOrderTaskLink({ toggleHiddenOrderTask }) {
  return (
      <div className="add_new_order_task" onClick={() => toggleHiddenOrderTask()}>
      Add new task for this order
      </div>
  );
};

function AddOrderTaskProcess({ isHiddenOrderTask, tasks_order_id }) {
  return (
      <>
          {isHiddenOrderTask ? <AddOrderTaskMain tasks_order_id={tasks_order_id} /> : null}
      </>
  );
};

function AddOrderTaskMain({ tasks_order_id }) {

  const initialOrderTaskValues = {
    description: '',
    order_id: tasks_order_id,
    date_of_issue: '',
    execution_date: '',
    execution_time: '',
    importance: '',
    completed: ''
  };

  const [orderTaskData, setOrderTaskData] = React.useState(initialOrderTaskValues);
  const [isLoadingOrderTaskData, setIsLoadingOrderTaskData] = React.useState(false);

  const handleOrderTaskInputChange = (dataOrderTask) => {
    const { name, value } = dataOrderTask;
    setOrderTaskData({
      ...orderTaskData,
      [name]: value
    });
  }; 

  const handleOrderTaskSubmit = (event) => {
    event.preventDefault();
    setIsLoadingOrderTaskData(true);

    axios.post('/add_task', orderTaskData)
      .then(() => {
        resetOrderTaskForm();
        setIsLoadingOrderTaskData(false);
      });
    
  };

  const resetOrderTaskForm = () => {
    setOrderTaskData({
      customer_id: '',
      customer_name: '',
      contact_name: '',
      phone: '',
      email: '',
      order_id: tasks_order_id,
      type_of_contract: '',
      departure_address: '',
      destination_address: '',
      product_common_description: '',
      total_gross_weight: '',
      total_gross_volume: '',
      incoterms: '',
      total_invoice_value: '',
      invoice_currency: '',
      total_cost: '',
      total_revenue: '',
      margin: '',
      date_of_order: '',
      order_status: '',
      description: '',
      date_of_issue: '',
      execution_date: '',
      execution_time: '',
      importance: '',
      completed: ''
    });
  };

  return (
    <>
      <form className="addordertask" onSubmit={handleOrderTaskSubmit}>

        <div className="taskinput">
          <div className="input-container description">
            <div className="input-label">Task description:</div>
            <input
              type="text"
              name="description"
              className="add_description"
              onChange={(event) => handleOrderTaskInputChange({ name: event.target.name, value: event.target.value })}
              value={orderTaskData.description}
            />
          </div>

          <div className="input-container">
            <div className="input-label">Date of task issue:</div>
            <input
              type="date"
              name="date_of_issue"
              className="add_date_of_issue"
              value={new Date().toISOString().split('T')[0]}
              readOnly
            />
          </div>

          <div className="input-container">
            <div className="input-label">Execution task date:</div>
            <input
              type="date"
              name="execution_date"
              className="add_execution_date"
              onChange={(event) => handleOrderTaskInputChange({ name: event.target.name, value: event.target.value })}
              value={orderTaskData.execution_date}
            />
          </div>

          <div className="input-container">
            <div className="input-label">Execution task time:</div>
            <input
              type="time"
              name="execution_time"
              className="add_execution_time"
              onChange={(event) => handleOrderTaskInputChange({ name: event.target.name, value: event.target.value })}
              value={orderTaskData.execution_time}
            />
          </div>

          <div className="input-container">
            <div className="input-label">Task importance:</div>
            <select
              name="importance"
              className="add_importance"
              onChange={(event) => handleOrderTaskInputChange({ name: event.target.name, value: event.target.value })}
              value={orderTaskData.importance}
            >
              <option value=""></option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
              <option value="Negligible">Negligible</option>
            </select>
          </div>

          <div className="input-container">
            <div className="input-label">Completed:</div>
            <select
              name="completed"
              className="add_completed"
              onChange={(event) => handleOrderTaskInputChange({ name: event.target.name, value: event.target.value })}
              value={orderTaskData.completed}
            >
              <option value=""></option>
              <option value={0}>In progress</option>
              <option value={1}>Completed</option>
            </select>
          </div>
        </div>

        <input type="submit" className="submit_order" name="submit_task" disabled={isLoadingOrderTaskData} />
      </form>
    </>
  )
};

function AddOrder({ setOrders }) {
  const [isHiddenOrder, setIsHiddenOrder] = React.useState(false);

  const toggleHiddenOrder = () => {
    setIsHiddenOrder(!isHiddenOrder);
  };
  
  return (
      <>
          <AddOrderLink toggleHiddenOrder={toggleHiddenOrder}/>
          <div className="AddOrderProcess">
            <AddOrderProcess isHiddenOrder={isHiddenOrder} setOrders={setOrders}/>
          </div>
      </>
  )
};

function AddOrderLink({ toggleHiddenOrder }) {
return (
    <div className="add_new_order" onClick={() => toggleHiddenOrder()}>
    Add new order
    </div>
);
};

function AddOrderProcess({ isHiddenOrder, setOrders }) {
return (
    <>
        {isHiddenOrder ? <AddOrderMain setOrders={setOrders}/> : null}
    </>
  )
};

window.CompanySearch = function ({ onChange, initionalName = '' }) {
  const [allCompanies, setAllCompanies] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [filteredCompanies, setFilteredCompanies] = React.useState([]);
  
  React.useEffect(() => {
    axios.get('/customers').then((response) => {
      setAllCompanies(response.data.customers_list);
    });
  }, []);

  const handleCustomerInputChange = (event) => { 
      setInputValue(event.target.value);
      const selectedCompany = filteredCompanies.find((company) => company.name === event.target.value);
      if (selectedCompany) {
        handleCompanySelect(selectedCompany);
        console.log('selectedCompany - ', selectedCompany);
      }
      else {
        handleCompanySelect({id:'new', name:event.target.value});
        console.log('newCompany - ', event.target.value);
      }
  };
  
  React.useEffect(() => {
    const filtered = allCompanies.filter((company) =>
      company.name && company.name.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    setFilteredCompanies(filtered);
  }, [inputValue, allCompanies]);
  

  const handleCompanySelect = (selectedCompany) => {
    if (selectedCompany.id !== 'new') {
      onChange([{
        name: "customer_id",
        value: selectedCompany.id,
      },{
        name: "name",
        value: selectedCompany.name,
      },{
        name: "contact_name",
        value: selectedCompany.contact_name,
      },{
        name: "phone",
        value: selectedCompany.phone,
      },{
        name: "email",
        value: selectedCompany.email,
      }]);
    } else {
      onChange([{
        name: "name",
        value: selectedCompany.name,
      }]);
    }
    setFilteredCompanies([]);
  };
  
  return (
      <div className="add-customer_name">
          <input
            type="text"
            name="name"
            className="custom-input"
            placeholder={initionalName}
            value={inputValue}
            onChange={handleCustomerInputChange}
            list="companies-list"
          />
          {filteredCompanies.length > 0 && (
              <datalist id="companies-list">
              {filteredCompanies.map((company) => (
                  <option 
                    key={company.id} 
                    value={company.name}>
                  </option>
              ))}
              </datalist>
          )}
      </div>
    );  
};
