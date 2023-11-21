from flask import Flask, flash, render_template, redirect, request, url_for, session
from functions import get_users_list, get_orders_list, get_parthners_list, get_tasks_list, get_last_task, create_order, create_parthner, create_task, update_order, update_parthner, update_task, create_user
from datetime import datetime

app = Flask(__name__)

app.secret_key = "rakbeyahadninceah"

@app.route('/')
def main():
    return render_template('login.html')

@app.route('/auth_form', methods=['POST'])
def auth_form():
    users = get_users_list()
    for user in users:
        if user["user_email"] == request.form["username"] and user["user_password"] == request.form["password"]:
            session["id"] = user["id"]
            return render_template("index.html")
    flash("Invalid username or password", "error")
    return redirect(url_for("login"))

@app.route('/submit_form', methods=['POST'])
def submit_form():
    if request.method == 'POST':
        if request.form['password'] == request.form['confirm_password']:
            create_user(request.form)
        return redirect(url_for('login'))
    
@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')
    
@app.route('/logout')
def logout():
    session.pop("username", None)
    return redirect(url_for('login'))


@app.route('/orders', methods=['GET'])
def show_orders():
    user_id = session.get("id")
    orders = get_orders_list(user_id)
    return {'orders_list':orders}

@app.route('/customers', methods=['GET'])
def show_customers():
    user_id = session.get("id")
    parthners = get_parthners_list(user_id)
    customers = list(filter(lambda parthner: parthner['types'] == 'customer', parthners))
    return {'customers_list':customers}

@app.route('/tasks', methods=['GET'])
def show_tasks():
    tasks = []
    order_id = request.args.get('id')
    if order_id:
        tasks = get_tasks_list(order_id = order_id)
    return {'tasks': tasks}
    

@app.route('/orderslist', methods=['GET'])
def show_orders_list():
    user_id = session.get("id")
    #print('user_id - ',user_id)
    orders_list = []
    orders = get_orders_list(user_id)
    customers = get_parthners_list(user_id)
    #print('orders - ', orders)
    #print('customers - ', customers)
    if orders:
        for order in orders:
            #print('order - ', order)
            customer = [item for item in customers if item["id"] == order.get("customer_id")]
            if customer:
                orders_list.append({**customer[0],**order})
            else:
                customer = {'types': '', 'name': '', 'country': '', 'legal_data': '', 'bank_data': '', 'phone': '', 'email': '', 'contact_name': ''}
                orders_list.append({**order, **customer})
    #print('orders_list - ', orders_list)
    return {'orders_list': orders_list}

@app.route('/taskslist', methods=['GET'])
def show_tasks_list():
    tasks_list = []
    user_id = session.get("id")
    orders = get_orders_list(user_id)
    customers = get_parthners_list(user_id)
    tasks = get_tasks_list(user_id = user_id)
    for task in tasks:
        order = [item for item in orders if item["id"] == task.get("order_id")][0]
        customer = [item for item in customers if item["id"] == order.get("customer_id")][0]
        tasks_list.append({**order, **customer, **task})
    return {'tasks_list': tasks_list}
    

@app.route('/update_order', methods=['POST'])
def update_order_data():
    data = request.get_json()
    data['types'] = 'customer'
    data['user_id'] = session.get("id")
    if data['customer_id']:
        update_parthner(data, data['customer_id'])
    else:
        data['customer_id'] = create_parthner(data)
    update_order(data, data['id'])
    return redirect(url_for('main'))

@app.route('/update_task', methods=['POST'])
def update_task_data():
    data = request.get_json()
    data['user_id'] = session.get("id")
    if data['order_id']:
        update_order(data, data['order_id'])
    else:
        data['order_id'] = create_order(data)
    update_task(data, data['id'])
    return redirect(url_for('main'))


@app.route('/add_order', methods=['POST'])
def add_order():
    data = request.get_json()
    data['user_id'] = session.get("id")
    data['types'] = 'customer'
    print('data - ', data)
    if data['customer_id']:
        update_parthner(data, data['customer_id'])
    else:
        data['customer_id'] = create_parthner(data)
    print('data -', data)
    create_order(data)
    return redirect(url_for('main'))

@app.route('/add_customer', methods=['POST'])
def add_customer():
    data = request.get_json()
    data['user_id'] = session.get("id")
    create_parthner(data)
    #print('data -', data)
    return redirect(url_for('main'))

@app.route('/add_task', methods=['POST'])
def add_task():
    data = request.get_json()
    #my_dict['key2'] = 'new_value2'
    data['user_id'] = session.get("id")
    data['date_of_issue'] = datetime.now().strftime("%Y-%m-%d")
    if data['execution_time'] and not data['execution_date']:
        data['execution_date'] = datetime.now().strftime("%Y-%m-%d")
    if data['execution_date'] and not data['execution_time']:
        data['execution_time'] = '00:00'
    if any(data.get(key) for key in ['description', 'execution_date', 'execution_time', 'importance']):
        data['date_of_issue'] = datetime.now().strftime("%Y-%m-%d")
    #print('data -', data)
    create_task(data)
    return redirect(url_for('main'))




secrets={"qwer":"qwer secret", "asdf":"asdf secret", "johnsonjasmine@hotmail.com":"qwer"}

@app.route('/secret/<username>')
def get_secret(username):
    if "username" in session and session["username"] == username:
        return secrets.get(username, "Secret not found")
    else:
        return "Unauthorized"

if __name__ == '__main__':
    app.run()

#fin