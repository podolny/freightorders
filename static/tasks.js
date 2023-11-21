function TasksList() {
  const [tasks, setTasks] = React.useState([]);
  const [filter, setFilter] = React.useState('');
  const [filteredTasks, setFilteredTasks] = React.useState([]);
  const [isHiddenTask, setIsHiddenTask] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const tasksResponse = await axios.get('/taskslist');
      if (tasksResponse && tasksResponse.data && tasksResponse.data.tasks_list && tasksResponse.data.tasks_list.length > 0) {
        const sortedTasks = tasksResponse.data.tasks_list.slice().sort((a, b) => {
          const dateA = new Date(a.execution_date);
          const dateB = new Date(b.execution_date);
          if (dateA > dateB) { return -1; }
          if (dateA < dateB) { return 1; }
          return 0;
        });
        setTasks(sortedTasks);
        console.log('tasksResponse - ', tasksResponse.data.tasks_list);
        const filteredTasks = sortedTasks.filter(task =>
          filter === "" || 
          String(task[filter.name]).toLowerCase().startsWith(String(filter.value).toLowerCase())
        );      
        setFilteredTasks(filteredTasks);
      } else {
        console.error("No tasks data available for sorting.");
      };
    };
    fetchData();
  }, [filter]);

  const handleTasksFilterChange = (filterValue) => {
    setFilter(filterValue);
  };

  const toggleHiddenTask = (taskId) => {
    if (isHiddenTask.includes(taskId)) {
      setIsHiddenTask(isHiddenTask.filter((id) => id !== taskId));
    } else {
      setIsHiddenTask([...isHiddenTask, taskId]);
    }
  };

  return (
    <>
      <div className="tasks_list">
        <div className="header">
          <div className="table-header">
            <TableHeaderTasks />
          </div>
          <div className="table-header">
            <TableFilterTasks handleTasksFilterChange={handleTasksFilterChange} />
          </div>
        </div>
        <div className="tasks">
          {filteredTasks.map((item) => (
            <div key={item.id}>
              <Task task={item} toggleHiddenTask={toggleHiddenTask} />
              <div className="task_description">
                <TaskDescription task={item} isHiddenTask={isHiddenTask} setTasks={setTasks}/>
              </div>
            </div>
          ))}
        </div>
        <div className="table_task_footer">
          <AddTask setTasks = {setTasks} />
        </div>
      </div>
    </>
  );
};

function TableFilterTasks({ handleTasksFilterChange }) {
  return (<div className="table_header_tasks">
                <div className="task_id">task id</div>
                <div className="customer_id">customer id</div>

                <input
                  name="name"
                  className="customer_name"
                  placeholder="Filter..."
                  onChange={(event) => handleTasksFilterChange({ name: event.target.name, value: event.target.value })}
                />

                <input
                  name="order_id"
                  className="order_id"
                  placeholder="Filter..."
                  onChange={(event) => handleTasksFilterChange({ name: event.target.name, value: event.target.value })}
                />

                <select
                  name="type_of_contract"
                  className="type_of_contract"
                  onChange={(event) => handleTasksFilterChange({ name: event.target.name, value: event.target.value })}
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
                  onChange={(event) => handleTasksFilterChange({ name: event.target.name, value: event.target.value })}
                />

                <input
                  name="destination_address"
                  className="destination_address"
                  placeholder="Filter..."
                  onChange={(event) => handleTasksFilterChange({ name: event.target.name, value: event.target.value })}
                />

                <input
                  name="product_common_description"
                  className="product_common_description"
                  placeholder="Filter..."
                  onChange={(event) => handleTasksFilterChange({ name: event.target.name, value: event.target.value })}
                />

                <div className="total_gross_weight">weight</div>
                <div className="total_gross_volume">volume</div>

                <select
                  name="incoterms"
                  className="incoterms"
                  onChange={(event) => handleTasksFilterChange({ name: event.target.name, value: event.target.value })}
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
                  onChange={(event) => handleTasksFilterChange({ name: event.target.name, value: event.target.value })}
                />

                <input
                  name="contact_name"
                  className="contact_name"
                  placeholder="Filter..."
                  onChange={(event) => handleTasksFilterChange({ name: event.target.name, value: event.target.value })}
                />

                <input
                  name="phone"
                  className="phone"
                  placeholder="Filter..."
                  onChange={(event) => handleTasksFilterChange({ name: event.target.name, value: event.target.value })}
                />

                <input
                  name="email"
                  className="email"
                  placeholder="Filter..."
                  onChange={(event) => handleTasksFilterChange({ name: event.target.name, value: event.target.value })}
                />

                <div className="date_of_order">date of order</div>

                <select
                  name="order_status"
                  className="order_status"
                  onChange={(event) => handleTasksFilterChange({ name: event.target.name, value: event.target.value })}
                >
                  <option value="" className="filter-placeholder">Filter ...</option>
                  <option value="start">start</option>
                  <option value="negotiation">negotiation</option>
                  <option value="shipping">shipping</option>
                  <option value="completed">completed</option>
                </select>

                <input
                  name="description"
                  className="description"
                  placeholder="Filter..."
                  onChange={(event) => handleTasksFilterChange({ name: event.target.name, value: event.target.value })}
                />

                <input
                  type='date'
                  name="execution_date"
                  className="execution_date"
                  placeholder="Filter..."
                  onChange={(event) => handleTasksFilterChange({ name: event.target.name, value: event.target.value })}
                />

                <div className="execition_time">execition</div>

                <select
                  name="importance"
                  className="importance"
                  onChange={(event) => handleTasksFilterChange({ name: event.target.name, value: event.target.value })}
                >
                  <option value="" className="filter-placeholder">Filter ...</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                  <option value="Negligible">Negligible</option>
                </select>

                <select
                  name="completed"
                  className="completedtask"
                  onChange={(event) => handleTasksFilterChange({ name: event.target.name, value: event.target.value })}
                >
                  <option value="" className="filter-placeholder">Filter ...</option>
                  <option value={0}>in progress</option>
                  <option value={1}>completed</option>
                </select>
            </div>
    )
};

function TableHeaderTasks() {
    return (<div className="table_header_tasks">
                <div className="task_id">id</div>
                <div className="customer_id">customer id</div>
                <div className="customer_name">customer</div>
                <div className="contact_name">contact name</div>
                <div className="phone">phone</div>
                <div className="email">email</div>

                <div className="order_id">order id</div>
                <div className="date_of_order">date of order</div>
                <div className="order_status">order status</div>
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

                <div className="description">description</div>
                <div className="execution_date">date</div>
                <div className="execition_time">time</div>
                <div className="importance">importance</div>
                <div className="completedtask">completed</div>
            </div>
    )
};

function Task({ task, toggleHiddenTask }) {
    return (
        <div className="task" onClick={() => toggleHiddenTask(task.id)}>
            <div className="task_id">{task.id}</div>
            <div className="customer_id">{task.customer_id}</div>
            <div className="customer_name">{task.name}</div>
            <div className="contact_name">{task.contact_name}</div>
            <div className="phone">{task.phone}</div>
            <div className="email">{task.email}</div>

            <div className="order_id">{task.order_id}</div>
            <div className="date_of_order">{task.date_of_order}</div>
            <div className="order_status">{task.order_status}</div>
            <div className="type_of_contract">{task.type_of_contract}</div>
            <div className="departure_address">{task.departure_address}</div>
            <div className="destination_address">{task.destination_address}</div>
            <div className="product_common_description">{task.product_common_description}</div>
            <div className="total_gross_weight">{task.total_gross_weight}</div>
            <div className="total_gross_volume">{task.total_gross_volume}</div>
            <div className="incoterms">{task.incoterms}</div>
            <div className="total_invoice_value">{task.total_invoice_value}</div>
            <div className="invoice_currency">{task.invoice_currency}</div>
            <div className="total_cost">{task.total_cost}</div>
            <div className="total_revenue">{task.total_revenue}</div>
            <div className="margin">{task.margin}</div>

            <div className="description">{task.description}</div>
            <div className="execution_date">{task.execution_date}</div>
            <div className="execition_time">{task.execution_time}</div>
            <div className="importance">{task.importance}</div>
            <div className="completedtask">
              {task.completed === 1 ? 'completed' : 'in progress'}
            </div>

        </div>
    );
};

function TaskDescription({ task, isHiddenTask, setTasks }) {
    return (
        <div>
            {isHiddenTask.includes(task.id) ? <TaskDescriptionMain task = {task} setTasks = {setTasks}/> : null}
        </div>
    );
};

function TaskDescriptionMain({task, setTasks}) {
    return (
      <>
        <AddTaskMain initialTaskValues={task} setTasks = {setTasks}/>
      </>
    )
};

function AddTaskMain({ initialTaskValues = {
    customer_id: '',
    customer_name: '',
    contact_name: '',
    phone: '',
    email: '',
    order_id: '',
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
    completed: ''},
      setTasks}) {
  const [taskData, setTaskData] = React.useState(initialTaskValues);
  const [isLoadingTaskData, setIsLoadingTaskData] = React.useState(false);

  const handleTaskInputChange = (dataOfTask) => {
    console.log('dataOfTask - ',dataOfTask)
    const partialData = dataOfTask.reduce((acc, item) => {
      acc[item.name] = item.value;
      return acc;
    }, {});
    setTaskData({
      ...taskData,
      ...partialData
    });
  }; 

  const handleTaskSubmit = async (event) => {
    event.preventDefault();
    setIsLoadingTaskData(true);
    console.log('taskData - ', taskData);
  
    if (taskData.id) {
      axios.post('/update_task', taskData)
        .then(() => {
          setIsLoadingTaskData(false);
          resetTaskForm();
        });
    } else {
      axios.post('/add_task', taskData)
        .then(() => {
          setIsLoadingTaskData(false);
          resetTaskForm();
        });
    };
    const tasksResponse = await axios.get('/taskslist');
    const updatedTasks = tasksResponse.data.tasks_list;
    console.log('updatedTasks - ',updatedTasks)
    setTasks(updatedTasks);
  };

  const resetTaskForm = () => {
    setTaskData({
      customer_id: '',
      customer_name: '',
      contact_name: '',
      phone: '',
      email: '',
      order_id: '',
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
      <form className="addtask" onSubmit={handleTaskSubmit}>

        <div className="taskinput">
          <div className="add-input-container-description">
            <div className="input-label">Task description:</div>
            <input
              type="text"
              name="description"
              className="add_description"
              onChange={(event) => handleTaskInputChange([{ name: event.target.name, value: event.target.value }])}
              value={taskData.description}
            />
          </div>

          <div className="add-input-container">
            <div className="input-label">Date of task issue:</div>
            <input
              type="text"
              name="date_of_issue"
              className="add_date_of_issue"
              onChange={(event) => handleTaskInputChange([{ name: event.target.name, value: event.target.value }])}
              value={taskData.date_of_issue}
              readOnly
            />
          </div>

          <div className="add-input-container">
            <div className="input-label">Execution task date:</div>
            <input
              type="date"
              name="execution_date"
              className="add_execution_date"
              onChange={(event) => handleTaskInputChange([{ name: event.target.name, value: event.target.value }])}
              value={taskData.execution_date}
            />
          </div>

          <div className="add-input-container">
            <div className="input-label">Execution task time:</div>
            <input
              type="text"
              name="execution_time"
              className="add_execution_time"
              onChange={(event) => handleTaskInputChange([{ name: event.target.name, value: event.target.value }])}
              value={taskData.execution_time}
            />
          </div>

          <div className="add-input-container">
            <div className="input-label">Importance:</div>
            <select
              name="importance"
              className="add_importance"
              onChange={(event) => handleTaskInputChange([{ name: event.target.name, value: event.target.value }])}
              value={taskData.importance}
            >
              <option value=""></option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
              <option value="Negligible">Negligible</option>
            </select>
          </div>

          <div className="add-input-container">
            <div className="input-label">Completed:</div>
            <select
              name="completed"
              className="add_completed"
              onChange={(event) => handleTaskInputChange([{ name: event.target.name, value: event.target.value }])}
              value={taskData.completed}
            >
              <option value=""></option>
              <option value={0}>In progress</option>
              <option value={1}>Completed</option>
            </select>
          </div>
        </div>

        <div className="ordercustomerinput">
          <div className="orderinput">
            <div className='orderlonginputs'>
              <div className="input-container">
                <div className="input-label">Departure address:</div>
                <input
                  type="text"
                  name="departure_address"
                  className="add-departure_address"
                  onChange={(event) => handleTaskInputChange([{ name: event.target.name, value: event.target.value }])}
                  value={taskData.departure_address}
                />
              </div>

              <div className="input-container">
                <div className="input-label">Destination address:</div>
                <input
                  type="text"
                  name="destination_address"
                  className="add-destination_address"
                  onChange={(event) => handleTaskInputChange([{ name: event.target.name, value: event.target.value }])}
                  value={taskData.destination_address}
                />
              </div>

              <div className="input-container">
                <div className="input-label">Cargo description:</div>
                <input
                  type="text"
                  name="product_common_description"
                  className="add-product_common_description"
                  onChange={(event) => handleTaskInputChange([{ name: event.target.name, value: event.target.value }])}
                  value={taskData.product_common_description}
                />
              </div>

            </div>

            <div className='ordershortinputs'>
              <div className="input-container">
                  <div className="input-label">Order:</div>
                  <OrderSearch onChange={handleTaskInputChange} initionalOrderId={initialTaskValues.order_id} />
              </div>

              <div className="input-container">
                <div className="input-label">Date of order:</div>
                <input
                  type="text"
                  name="date_of_order"
                  className="add-date_of_order"
                  onChange={(event) => handleTaskInputChange([{ name: event.target.name, value: event.target.value }])}
                  value={taskData.date_of_order}
                />
              </div>

              <div className="input-container">
                <div className="input-label">Order status:</div>
                <input
                  type="text"
                  name="order_status"
                  className="add-order_status"
                  onChange={(event) => handleTaskInputChange([{ name: event.target.name, value: event.target.value }])}
                  value={taskData.order_status}
                />
              </div>

              <div className="input-container">
                <div className="input-label">Type of contract:</div>
                <select
                  name="type_of_contract"
                  className="add-type_of_contract"
                  onChange={(event) => handleTaskInputChange([{ name: event.target.name, value: event.target.value }])}
                  value={taskData.type_of_contract}
                >
                  <option value=""></option>
                  <option value="import">Import</option>
                  <option value="export">Export</option>
                  <option value="internal">Internal</option>
                  <option value="external">External</option>
                </select>
              </div>

              <div className="input-container">
                <div className="input-label">Gross weight, kg:</div>
                <input
                  type="number"
                  name="total_gross_weight"
                  className="add-total_gross_weight"
                  onChange={(event) => handleTaskInputChange([{ name: event.target.name, value: event.target.value }])}
                  value={taskData.total_gross_weight}
                />
              </div>

              <div className="input-container">
                <div className="input-label">Total volume, m3:</div>
                <input
                  type="number"
                  name="total_gross_volume"
                  className="add-total_gross_volume"
                  onChange={(event) => handleTaskInputChange([{ name: event.target.name, value: event.target.value }])}
                  value={taskData.total_gross_volume}
                />
              </div>

              <div className="input-container">
                <div className="input-label">Incoterms:</div>
                <select
                  name="incoterms"
                  className="add-incoterms"
                  onChange={(event) => handleTaskInputChange([{ name: event.target.name, value: event.target.value }])}
                  value={taskData.incoterms}
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

              <div className="input-container">
                <div className="input-label">Total invoice value:</div>
                <input
                  type="number"
                  name="total_invoice_value"
                  className="add-total_invoice_value"
                  onChange={(event) => handleTaskInputChange([{ name: event.target.name, value: event.target.value }])}
                  value={taskData.total_invoice_value}
                />
              </div>

              <div className="input-container">
                <div className="input-label">Invoice currency:</div>
                <select
                  name="invoice_currency"
                  className="add-invoice_currency"
                  onChange={(event) => handleTaskInputChange([{ name: event.target.name, value: event.target.value }])}
                  value={taskData.invoice_currency}>
                  <option value=""></option>
                  <option value="ILS">ILS</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="CNY">CNY</option>
                  <option value="RUB">RUB</option>
                </select>
              </div>

              <div className="input-container">
                <div className="input-label">Total cost:</div>
                <input
                  type="number"
                  name="total_cost"
                  className="add-total_cost"
                  onChange={(event) => handleTaskInputChange([{ name: event.target.name, value: event.target.value }])}
                  value={taskData.total_cost}
                />
              </div>

              <div className="input-container">
                <div className="input-label">Total revenue:</div>
                <input
                  type="number"
                  name="total_revenue"
                  className="add-total_revenue"
                  onChange={(event) => handleTaskInputChange([{ name: event.target.name, value: event.target.value }])}
                  value={taskData.total_revenue}
                />
              </div>

              <div className="input-container">
                <div className="input-label">Margin:</div>
                <input
                  type="number"
                  placeholder="margin"
                  className="add-margin"
                  onChange={(event) => handleTaskInputChange([{ name: event.target.name, value: event.target.value }])}
                  value={taskData.margin}
                />
              </div>
            </div>
          </div>  
          <div className="customerinput">
            <div className="input-container">
                <div className="input-label">Customer name:</div>
                <CompanySearch onChange={handleTaskInputChange} initionalName={initialTaskValues.name} />
            </div>
            
            <div className="input-container">
              <div className="input-label">Contact name:</div>
              <input
                type="text"
                name="contact_name"
                className="add-contact_name"
                onChange={(event) => handleTaskInputChange([{ name: event.target.name, value: event.target.value }])}
                value={taskData.contact_name}
              />
            </div>

            <div className="input-container">
              <div className="input-label">Phone:</div>
              <input
                type="text"
                name="phone"
                className="add-phone"
                onChange={(event) => handleTaskInputChange([{ name: event.target.name, value: event.target.value }])}
                value={taskData.phone}
              />
            </div>

            <div className="input-container">
              <div className="input-label">e-mail:</div>
              <input
                type="text"
                name="email"
                className="add-email"
                onChange={(event) => handleTaskInputChange([{ name: event.target.name, value: event.target.value }])}
                value={taskData.email}
              />
            </div>
          </div>
        </div>

        <input type="submit" name="submit_task" disabled={isLoadingTaskData} />
      </form>
    </>
  )
};

function AddTask({ setTasks }) {
    const [isHiddenTask, setIsHiddenTask] = React.useState(false);

    const toggleHiddenTask = () => {
      setIsHiddenTask(!isHiddenTask);
    };

    return (
      <>
          <AddTaskLink toggleHiddenTask={toggleHiddenTask}/>
          <div className="AddTaskProcess">
            <AddTaskProcess  isHiddenTask={isHiddenTask} setTasks = {setTasks}/>
          </div>
      </>
  );
};

function AddTaskLink({ toggleHiddenTask }) {
  return (
      <div className="add_new_task" onClick={() => toggleHiddenTask()}>
      Add new task
      </div>
  );
};

function AddTaskProcess({ isHiddenTask, setTasks }) {
  return (
      <>
          {isHiddenTask ? <AddTaskMain setTasks={setTasks}/> : null}
      </>
  );
};

function OrderSearch({ onChange, initionalOrderId = '' }) {
    const [allTaskOrders, setAllTaskOrders] = React.useState([]);
    const [inputTaskOrdersValue, setTaskOrdersInputValue] = React.useState('');
    const [filteredTaskOrders, setFilteredTaskOrders] = React.useState([]);
    
    React.useEffect(() => {
      axios.get('/orders').then((response) => {
        setAllTaskOrders(response.data.orders_list);
      });
    }, []);

    const handleTaskOrderInputChange = (event) => { 
        console.log('event.target.value - ', event.target.value);
        console.log('filtered task orders - ', filteredTaskOrders);
        setTaskOrdersInputValue(event.target.value);
        const selectedTaskOrder = filteredTaskOrders.find((ord) => ord.id === parseInt(event.target.value));
        console.log('issue selectedTaskOrder - ',selectedTaskOrder);
        if (selectedTaskOrder) {
          handleTaskOrderSelect(selectedTaskOrder);
          console.log('selectedTaskOrder - ',selectedTaskOrder);
        }
        else {
          handleTaskOrderSelect({id:'new', name:event.target.value});
          console.log('new selectedTaskOrder - ',selectedTaskOrder);
        };
    };
    
    React.useEffect(() => {
        const inputValueString = inputTaskOrdersValue.toString();
        const filtered = allTaskOrders.filter((taskOrder) =>
          taskOrder.id.toString().startsWith(inputValueString)
        );
        setFilteredTaskOrders(filtered);
      }, [inputTaskOrdersValue, allTaskOrders]);   
  
    const handleTaskOrderSelect = (selectedTaskOrder) => {
      if (selectedTaskOrder.id !== 'new') {
        onChange([{
          name: "order_id",
          value: selectedTaskOrder.id,
        },{
          name: "user_id",
          value: selectedTaskOrder.user_id,
        },{
          name: "customer_id",
          value: selectedTaskOrder.customer_id,
        },{
          name: "type_of_contract",
          value: selectedTaskOrder.type_of_contract,
        },{
          name: "departure_address",
          value: selectedTaskOrder.departure_address,
        },{
          name: "destination_address",
          value: selectedTaskOrder.destination_address,
        },{
          name: "product_common_description",
          value: selectedTaskOrder.product_common_description,
        },{
          name: "total_gross_weight",
          value: selectedTaskOrder.total_gross_weight,
        },{
          name: "total_gross_volume",
          value: selectedTaskOrder.total_gross_volume,
        },{
          name: "incoterms",
          value: selectedTaskOrder.incoterms,
        },{
          name: "total_invoice_value",
          value: selectedTaskOrder.total_invoice_value,
        },{
          name: "invoice_currency",
          value: selectedTaskOrder.invoice_currency,
        },{
          name: "total_cost",
          value: selectedTaskOrder.total_cost,
        },{
          name: "total_revenue",
          value: selectedTaskOrder.total_revenue,
        },{
          name: "margin",
          value: selectedTaskOrder.margin,
        },{
          name: "date_of_order",
          value: selectedTaskOrder.date_of_order,
        },{
          name: "order_status",
          value: selectedTaskOrder.order_status,
        }]);
      } else {
        onChange([{
          name: "product_common_description",
          value: selectedTaskOrder.name,
        }]);
      }
      setFilteredTaskOrders([]);
    };
    
    

return (
  <div className="order_id">
    <input 
      type="text" 
      name="order_id" 
      placeholder={initionalOrderId}
      value={inputTaskOrdersValue} 
      onChange={handleTaskOrderInputChange} 
      list="orders-list" 
    />
    {filteredTaskOrders.length > 0 && (
      <datalist id="orders-list">
        {filteredTaskOrders.map((taskOrder) => (
          <option 
            key={taskOrder.id} 
            value={taskOrder.id}>
          </option>
        ))}
      </datalist>
    )}
  </div>
  );
};
