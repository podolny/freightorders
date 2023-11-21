import classes
import constants
import sqlite3
from db import query_db
from datetime import datetime


def tuples_to_dicts(list_of_tuples):
    dict = {}
    for tuple_item in list_of_tuples:
        dict[tuple_item[0]] = tuple_item[1]
    return dict

def tuple_to_dict(dict_keys, tuple):
    result = {}
    if tuple:
        for i, key in enumerate(dict_keys):
            if i <= len(tuple) - 1:
                value = tuple[i]
                result[key] = value
            else:
                result[key] = None
    return result


def create_user(user):
    #print('user - ', user)
    sql = """
        INSERT INTO users (
        user_email,
        user_password
        )
        VALUES (?, ?)
    """
    values = (
        user['email'],
        user['password'],
    )
    user_id = query_db(sql, constants.data_sqlite, values)
    return user_id

def get_users_list():
    sql = """
        SELECT 
            id,
            user_email,
            user_password
        FROM users
    """
    rows = query_db(sql, constants.data_sqlite)
    users_list = []
    for row in rows:
        user = tuple_to_dict(constants.user_keys, row)
        users_list.append(user)
    print('users_list from functions - ', users_list)
    return users_list

def delete_user(id):
    sql = f"""DELETE FROM users WHERE id = {id}"""
    query_db(sql, constants.data_sqlite)


def create_order(order):
    #print('order for creating - ', order)
    sql = """
        INSERT INTO orders (
            user_id,
            customer_id,
            type_of_contract, 
            departure_address, 
            destination_address, 
            product_common_description, 
            total_gross_weight, 
            total_gross_volume, 
            incoterms, 
            total_invoice_value, 
            invoice_currency,
            total_cost, 
            total_revenue,
            margin,
            date_of_order,
            order_status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """
    values = (
        order.get('user_id'),
        order.get('customer_id'),
        order.get('type_of_contract'),
        order.get('departure_address'),
        order.get('destination_address'),
        order.get('product_common_description'),
        order.get('total_gross_weight'),
        order.get('total_gross_volume'),
        order.get('incoterms'),
        order.get('total_invoice_value'),
        order.get('invoice_currency'),
        order.get('total_cost'),
        order.get('total_revenue'),
        order.get('margin'),
        order.get('date_of_order'),
        order.get('order_status'),
    )
    order_id = query_db(sql, constants.data_sqlite, values)
    return order_id
    
def update_order(data, id):
    #print('data - ', data)
    #print('id - ', id)
    sql = f'''
        UPDATE orders
        SET
            customer_id = '{data.get('customer_id')}',
            type_of_contract = '{data.get('type_of_contract')}',
            departure_address = '{data.get('departure_address')}',
            destination_address = '{data.get('destination_address')}',
            product_common_description = '{data.get('product_common_description')}',
            total_gross_weight = '{data.get('total_gross_weight')}',
            total_gross_volume = '{data.get('total_gross_volume')}',
            incoterms = '{data.get('incoterms')}',
            total_invoice_value = '{data.get('total_invoice_value')}',
            invoice_currency = '{data.get('invoice_currency')}',
            total_cost = '{data.get('total_cost')}',
            total_revenue = '{data.get('total_revenue')}',
            margin = '{data.get('margin')}',
            date_of_order = '{data.get('date_of_order')}',
            order_status = '{data.get('order_status')}'
        WHERE id = {id}
    '''
    query_db(sql, constants.data_sqlite)

def delete_order(id):
    sql = f"""DELETE FROM orders WHERE id = {id}"""
    query_db(sql, constants.data_sqlite)

def get_orders_list(user_id=''):
    sql = """
        SELECT 
            id,
            user_id,
            customer_id,
            type_of_contract,
            departure_address,
            destination_address,
            product_common_description,
            total_gross_weight,
            total_gross_volume,
            incoterms,
            total_invoice_value,
            invoice_currency,
            total_cost,
            total_revenue,
            margin,
            date_of_order,
            order_status
        FROM orders
    """
    if user_id != '':
        sql += " WHERE user_id = ?"

    rows = query_db(sql, constants.data_sqlite, (user_id,))
    orders_list = []
    for row in rows:
        order = tuple_to_dict(constants.order_keys, row)
        orders_list.append(order)
    return orders_list



def create_parthner(parthner):
    sql = """
        INSERT INTO parthners (
            user_id,
            types, 
            name, 
            phone,
            email,
            contact_name
        ) 
        VALUES (?, ?, ?, ?, ?, ?)
    """
    values = (
        parthner.get('user_id'),
        parthner.get('types'),
        parthner.get('name'),
        parthner.get('phone'),
        parthner.get('email'),
        parthner.get('contact_name')
    )
    parthner_id = query_db(sql, constants.data_sqlite, values)
    return parthner_id

def update_parthner(data, id):
    sql = f'''
        UPDATE parthners
        SET
            types = '{data.get('types')}',
            name = '{data.get('name')}',
            phone = '{data.get('phone')}',
            email = '{data.get('email')}',
            contact_name = '{data.get('contact_name')}'
        WHERE id = {id}
    '''
    query_db(sql, constants.data_sqlite)

def delete_parthner(id):
    sql = f"""DELETE FROM parthners WHERE id = {id}"""
    query_db(sql, constants.data_sqlite)

def get_parthners_list(user_id = ''):
    sql = """
    SELECT 
        id,
        user_id,
        types, 
        name, 
        country, 
        legal_data, 
        bank_data,
        phone,
        email,
        contact_name
        FROM parthners
    """
    if user_id != '':
        sql += " WHERE user_id = ?"
    rows = query_db(sql, constants.data_sqlite, (user_id,))
    parthners_list = []
    for row in rows:
        parthner = tuple_to_dict(constants.parthner_keys, row)
        parthners_list.append(parthner)
    #print('parthner_list - ', parthners_list)
    return parthners_list


def create_task(task):
    sql = f"""
        INSERT INTO tasks (
            user_id,
            description, 
            order_id,
            date_of_issue, 
            execution_date, 
            execution_time, 
            importance,
            completed
        )
        VALUES (
            '{task.get('user_id')}',
            '{task.get('description')}',
            '{task.get('order_id')}',
            '{task.get('date_of_issue')}',
            '{task.get('execution_date')}',
            '{task.get('execution_time')}',
            '{task.get('importance')}',
            '{task.get('completed')}'
        )
    """
    query_db(sql, constants.data_sqlite)

def update_task(data, id):
    sql = f'''
        UPDATE tasks
        SET
            description = '{data.get('description')}',
            order_id = {data.get('order_id')},
            date_of_issue = '{data.get('date_of_issue')}',
            execution_date = '{data.get('execution_date')}',
            execution_time = '{data.get('execution_time')}',
            importance = '{data.get('importance')}',
            completed = '{data.get('completed')}'
        WHERE id = {id}
    '''
    query_db(sql, constants.data_sqlite)

def get_tasks_list(order_id = '', user_id = ''):
    sql = """
    SELECT 
        id,
        user_id,
        description, 
        order_id,
        date_of_issue, 
        execution_date, 
        execution_time, 
        importance,
        completed
        FROM tasks
    """
    if order_id != '':
        sql += " WHERE order_id = ?"
        rows = query_db(sql, constants.data_sqlite, (order_id,))
    if user_id != '':
        sql += " WHERE user_id = ?"
        rows = query_db(sql, constants.data_sqlite, (user_id,))
    tasks_list = []
    for row in rows:
        task = tuple_to_dict(constants.task_keys, row)
        tasks_list.append(task)
    return tasks_list    






def get_last_task(order_id, tasks_list):
    tasks_list_order = list(filter(lambda task: task['order_id'] == order_id, tasks_list))
    #print('tasks_list_order - ', tasks_list_order)
    if tasks_list_order != []:
        result = tasks_list_order[0]
        task_date = datetime.strptime("01/01/1950", "%d/%m/%Y").date()
        task_time = datetime.strptime("00:00", "%H:%M").time()
        #print('task_date - ', task_date)
        #print('task_time - ', task_time)
        for task in tasks_list_order:
            if task.get('execution_date') and datetime.strptime(task.get('execution_date'), "%Y-%m-%d").date() > task_date:
                result = task
            if task.get('execution_date') and datetime.strptime(task.get('execution_date'), "%Y-%m-%d").date() == task_date:
                if task.get('execution_time') and datetime.strptime(task.get('execution_time'), "%H:%M").time() > task_time:
                    result = task
        #print('result - ', result)        
        return result
    non_task = {'id': None, 'description': '', 'order_id': '', 'date_of_issue': '', 'execution_date': '', 'execution_time': '', 'importance': '', 'completed': ''}
    return non_task

def update_address(args):
    address = address_to_class(args)
    sql = f'''
        UPDATE addresses
        SET
            zip_code = '{address.zip_code}',
            country = '{address.country}',
            city = '{address.city}',
            rest_data = '{address.rest_data}'
        WHERE id = {address.id}
    '''
    query_db(sql, constants.data_sqlite)

def delete_address(id):
    sql = f"""DELETE FROM addresses WHERE id = {id}"""
    query_db(sql, constants.data_sqlite)

def create_logistic_leg(args):
    logistic_leg = logistic_leg_to_class(args)
    sql = f'''
        INSERT INTO logistic_legs (
            order_id, 
            parthner_id, 
            departure_address, 
            destination_address, 
            customs_value, 
            costs
        ) 
        VALUES (
            '{logistic_leg.order_id}',
            '{logistic_leg.parthner_id}',
            '{logistic_leg.departure_address}',
            '{logistic_leg.destination_address}',
            '{logistic_leg.customs_value}',
            '{logistic_leg.costs}'
        )
    '''
    query_db(sql, constants.data_sqlite)

def update_logistic_leg(args):
    logistic_leg = logistic_leg_to_class(args)
    sql = f'''
        UPDATE logistic_legs
        SET
            order_id = '{logistic_leg.order_id}',
            parthner_id = '{logistic_leg.parthner_id}',
            departure_address = '{logistic_leg.departure_address}',
            destination_address = '{logistic_leg.destination_address}',
            customs_value = '{logistic_leg.customs_value}',
            costs = '{logistic_leg.costs}'
        WHERE id = {logistic_leg.id}
    '''
    
    query_db(sql, constants.data_sqlite)

def delete_logistic_leg(id):
    sql = f"""DELETE FROM logistic_legs WHERE id = {id}"""
    query_db(sql, constants.data_sqlite)

def create_custom_leg(args):
    custom_leg = custom_leg_to_class(args)
    sql = f'''
        INSERT INTO customs_legs (
            type, 
            order_id, 
            parthner_id, 
            hs_code, 
            customs_value, 
            currency, 
            tax_procent, 
            vat_procent, 
            tax, 
            vat
        ) 
        VALUES (
            '{custom_leg.type}',
            '{custom_leg.order_id}',
            '{custom_leg.parthner_id}',
            '{custom_leg.hs_code}',
            '{custom_leg.customs_value}',
            '{custom_leg.currency}', 
            '{custom_leg.tax_procent}',
            '{custom_leg.vat_procent}',
            '{custom_leg.tax}',
            '{custom_leg.vat}'
        )
    '''
    query_db(sql, constants.data_sqlite)

def update_custom_leg(args):
    custom_leg = custom_leg_to_class(args)
    sql = f'''
        UPDATE customs_legs
        SET
            type = '{custom_leg.type}',
            order_id = '{custom_leg.order_id}',
            parthner_id = '{custom_leg.parthner_id}',
            hs_code = '{custom_leg.hs_code}',
            customs_value = '{custom_leg.customs_value}',
            currency = '{custom_leg.currency}',
            tax_procent = '{custom_leg.tax_procent}',
            vat_procent = '{custom_leg.vat_procent}',
            tax = '{custom_leg.tax}',
            vat = '{custom_leg.vat}'
        WHERE id = {custom_leg.id}
    '''
    query_db(sql, constants.data_sqlite)

def delete_custom_leg(id):
    sql = f"""DELETE FROM customs_legs WHERE id = {id}"""
    query_db(sql, constants.data_sqlite)

def create_product(args):
    product = product_to_class(args)
    sql = f'''
        INSERT INTO products (
            description, 
            article, 
            trade_mark, 
            manufacturer_data, 
            quantity_units, 
            units, 
            unit_net_weight, 
            unit_gross_weight, 
            unit_volume, 
            unit_invoice,
            quantity_transport_units, 
            transport_units, 
            total_invoice, 
            invoice_currency, 
            total_net_weight, 
            total_gross_weight, 
            transport_cost, 
            total_volume, 
            customs_cost
        ) 
        VALUES (
            '{product.description}',
            '{product.article}',
            '{product.trade_mark}',
            '{product.manufacturer_data}',
            '{product.quantity_units}',
            '{product.units}', 
            '{product.unit_net_weight}',
            '{product.unit_gross_weight}',
            '{product.unit_volume}',
            '{product.unit_invoice}',
            '{product.quantity_transport_units}',
            '{product.transport_units}',
            '{product.total_invoice}',
            '{product.invoice_currency}',
            '{product.total_net_weight}',
            '{product.total_gross_weight}',
            '{product.total_volume}',
            '{product.transport_cost}',
            '{product.customs_cost}'
        )
    '''
    query_db(sql, constants.data_sqlite)

def update_product(args):
    product = product_to_class(args)
    sql = f'''
        UPDATE products
        SET
            description = '{product.description}',
            article = '{product.article}',
            trade_mark = '{product.trade_mark}',
            manufacturer_data = '{product.manufacturer_data}',
            quantity_units = '{product.quantity_units}',
            units = '{product.units}',
            unit_net_weight = '{product.unit_net_weight}',
            unit_gross_weight = '{product.unit_gross_weight}',
            unit_volume = '{product.unit_volume}',
            unit_invoice = '{product.unit_invoice}',
            quantity_transport_units = '{product.quantity_transport_units}',
            transport_units = '{product.transport_units}',
            total_invoice = '{product.total_invoice}',
            invoice_currency = '{product.invoice_currency}',
            total_net_weight = '{product.total_net_weight}',
            total_gross_weight = '{product.total_gross_weight}',
            total_volume = '{product.total_volume}',
            transport_cost = '{product.transport_cost}',
            customs_cost = '{product.customs_cost}'
        WHERE id = {product.id}
    '''
    query_db(sql, constants.data_sqlite)

def delete_product(id):
    sql = f"""DELETE FROM products WHERE id = {id}"""
    query_db(sql, constants.data_sqlite)



def order_to_class(args):
    request = tuples_to_dicts(args)
    result = classes.Order(
        id = request.get('id'),
        customer_id = request.get('customer_id'),
        type_of_contract = request.get('type_of_contract'),
        departure_address = request.get('departure_address'),
        destination_address = request.get('destination_address'),
        product_common_description = request.get('product_common_description'),
        total_gross_weight = request.get('total_gross_weight'),
        total_gross_volume = request.get('total_gross_volume'),
        incoterms = request.get('incoterms'),
        total_invoice_value = request.get('total_invoice_value'),
        invoice_currency = request.get('invoice_currency'),
        total_cost = request.get('total_cost'),
        total_revenue = request.get('total_revenue'),
        margin = request.get('margin'),
        date_of_order = request.get('date_of_order'),
        order_status = request.get('order_status'),
        )
    return result

def parthner_to_class(args):
    request = tuples_to_dicts(args)
    result = classes.Parthner(
        id = request.get('id'),
        types = request.get('types'),
        name = request.get('name'),
        country = request.get('country'),
        legal_data = request.get('legal_data'),
        bank_data = request.get('bank_data'),
        phone = request.get('phone'),
        email = request.get('email'),
        contact_name = request.get('contact_name'),
        )
    return result

def address_to_class(args):
    request = tuples_to_dicts(args)
    result = classes.Address(
        id = request.get('id'),
        zip_code = request.get('zip_code'),
        country = request.get('country'),
        city = request.get('city'),
        rest_data = request.get('rest_data'),
        )
    return result

def logistic_leg_to_class(args):
    request = tuples_to_dicts(args)
    result = classes.Logistic_leg(
        id = request.get('id'),
        order_id = request.get('order_id'),
        parthner_id = request.get('parthner_id'),
        departure_address = request.get('departure_address'),
        destination_address = request.get('destination_address'),
        customs_value = request.get('customs_value'),
        costs = request.get('costs'),
        )
    return result

def custom_leg_to_class(args):
    request = tuples_to_dicts(args)
    result = classes.Customs_leg(
        id = request.get('id'),
        type = request.get('type'),
        order_id = request.get('order_id'),
        parthner_id = request.get('parthner_id'),
        hs_code = request.get('hs_code'),
        customs_value = request.get('customs_value'),
        currency = request.get('currency'),
        tax_procent = request.get('tax_procent'),
        vat_procent = request.get('vat_procent'),
        tax = request.get('tax'),
        vat = request.get('vat'),
        )
    return result

def product_to_class(args):
    request = tuples_to_dicts(args)
    result = classes.Product(
        id = request.get('id'),
        description = request.get('description'),
        article = request.get('article'),
        trade_mark = request.get('trade_mark'),
        manufacturer_data = request.get('manufacturer_data'),
        quantity_units = request.get('quantity_units'),
        units = request.get('units'),
        unit_net_weight = request.get('unit_net_weight'),
        unit_gross_weight = request.get('unit_gross_weight'),
        unit_volume = request.get('unit_volume'),
        unit_invoice = request.get('unit_invoice'),
        quantity_transport_units = request.get('quantity_transport_units'),
        transport_units = request.get('transport_units'),
        total_invoice = request.get('total_invoice'),
        invoice_currency = request.get('invoice_currency'),
        total_net_weight = request.get('total_net_weight'),
        total_gross_weight = request.get('total_gross_weight'),
        total_volume = request.get('total_volume'),
        transport_cost = request.get('transport_cost'),
        customs_cost = request.get('customs_cost'),
        )
    return result


#create_parthner([('types', 'byer'),('name', 'testname'),('country', 'Russia'),('legal_data', 'test legal data'),('bank_data', 'test bank data')])

#create_address([('zip_code', '123456'),('country', 'Israel'),('city', 'Tel-Aviv'),('rest_data', 'test rest data')])

#create_logistic_leg([('order_id', 1),('parthner_id', 1),('departure_address', 'Russia'),('destination_address', 'Israel'),('customs_value', 0),('costs', 1000.00)])

#create_custom_leg([('type', 'import'),('order_id', 1),('parthner_id', 1),('hs_code', '3925006912'),('customs_value', 1500.23),('currency', 'usd'),('tax_procent', 15),('vat_procent', 20),('tax', 600.00),('vat', 1300.23)])

#create_product([('description', 'testgoods'),('article', 'testarticle'),('trade_mark', 'testmark'),('manufacturer_data', 'testdata'),('quantity_units', 100),('units', 'pcs'),('unit_net_weight', 1),('unit_gross_weight', 1.5),('unit_volume', 0.01),('unit_invoice', 10.00),('quantity_transport_units', 2),('transport_units', 'pll'),('total_invoice', 1000.00),('invoice_currency', 'usd'),('total_net_weight', 1000.00),('total_gross_weight', 1500.23),('total_volume', 1.2),('transport_cost', 1300.23),('customs_cost', 5236.23)])

#create_order([('customer_id', 2),('name', 'Importer_1'),('type_of_contract', 'import'),('departure_address', 'test address 3'),('destination_address', 'test address 4'),('product_common_description', 'test goods1'),('total_gross_weight', 2500.23),('total_gross_volume', 2.234),('incoterms', 'FOB'),('total_invoice_value', 345.23),('invoice_currency', 'usd'),('total_cost', 564.23),('total_revenue', 54.65), ('margin', 400)])

#update_logistic_leg([('id', 2),('order_id', 2),('parthner_id', 2),('departure_address', 'Russia'),('destination_address', 'Israel'),('customs_value', 0),('costs', 1000.23)])

#update_parthner([('id', 4),('types', 'agent'),('name', 'testname'),('country', 'Russia'),('legal_data', 'test legal data'),('bank_data', 'test bank data')])

#update_address([('id', 1),('zip_code', '654321'),('country', 'Israel'),('city', 'Tel-Aviv'),('rest_data', 'test rest data')])

#update_custom_leg([('id', 1),('type', 'export'),('order_id', 1),('parthner_id', 1),('hs_code', '3925006912'),('customs_value', 1500.23),('currency', 'usd'),('tax_procent', 15),('vat_procent', 20),('tax', 600.00),('vat', 1300.23)])

#update_product([('id', 1),('description', 'test'),('article', 'testarticle'),('trade_mark', 'testmark'),('manufacturer_data', 'testdata'),('quantity_units', 100),('units', 'pcs'),('unit_net_weight', 1),('unit_gross_weight', 1.5),('unit_volume', 0.01),('unit_invoice', 10.00),('quantity_transport_units', 2),('transport_units', 'pll'),('total_invoice', 1000.00),('invoice_currency', 'usd'),('total_net_weight', 1000.00),('total_gross_weight', 1500.23),('total_volume', 1.2),('transport_cost', 1300.23),('customs_cost', 5236.23)])

#update_order([('id', 2),('customer_id', 4),('type_of_contract', 'export'),('departure_address', 'test address 3'),('destination_address', 'test address 4'),('product_common_description', 'test goods3'),('total_gross_weight', 6500.23),('total_gross_volume', 4.234),('incoterms', 'FOB'),('total_invoice_value', 124345.23),('invoice_currency', 'usd'),('total_cost', 4564.23),('total_revenue', 1654.65),('margin', 3654.65)])

#tuples_to_dicts([('types', 'customer'),('name', 'testname'),('country', 'Russia'),('legal_data', 'test legal data'),('bank_data', 'test bank data')])
