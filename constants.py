data_sqlite = 'data.sqlite'

user_keys = ('id', 
            'user_email', 
            'user_password')

order_keys = ('id', 
              'user_id',
              'customer_id', 
              'type_of_contract', 
              'departure_address', 
              'destination_address',
              'product_common_description', 
              'total_gross_weight', 
              'total_gross_volume', 
              'incoterms', 
              'total_invoice_value', 
              'invoice_currency', 
              'total_cost', 
              'total_revenue', 
              'margin', 
              'date_of_order', 
              'order_status')

parthner_keys = ('id', 
                 'user_id',
                 'types', 
                 'name', 
                 'country', 
                 'legal_data', 
                 'bank_data', 
                 'phone', 
                 'email', 
                 'contact_name')

task_keys = ('id',
            'user_id',
            'description', 
            'order_id',
            'date_of_issue', 
            'execution_date', 
            'execution_time', 
            'importance',
            'completed')


create_user_table = f'''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            user_email TEXT,
            user_password TEXT
        )
    '''

create_orders_table = f'''
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY,
            user_id INTEGER,
            customer_id INTEGER,
            type_of_contract TEXT,
            departure_address TEXT,
            destination_address TEXT,
            product_common_description TEXT,
            total_gross_weight REAL,
            total_gross_volume REAL,
            incoterms TEXT,
            total_invoice_value REAL,
            invoice_currency TEXT,
            total_cost REAL,
            total_revenue REAL,
            margin REAL,
            date_of_order TEXT,
            order_status TEXT,
            FOREIGN KEY (customer_id) REFERENCES parthners (id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
    '''

create_parthners_table = f'''
        CREATE TABLE IF NOT EXISTS parthners (
            id INTEGER PRIMARY KEY,
            user_id INTEGER,
            types TEXT,
            name TEXT,
            country TEXT,
            legal_data TEXT,
            bank_data TEXT,
            phone TEXT,
            email TEXT,
            contact_name TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    '''

create_tasks_table = f'''
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY,
            user_id INTEGER,
            description TEXT,
            order_id INTEGER,
            date_of_issue TEXT,
            execution_date TEXT,
            execution_time TEXT,
            importance TEXT,
            completed INTEGER,
            FOREIGN KEY (order_id) REFERENCES orders (id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    '''



create_addresses_table = f'''
        CREATE TABLE IF NOT EXISTS addresses (
            id INTEGER PRIMARY KEY,
            zip_code TEXT,
            country TEXT,
            city TEXT,
            rest_data TEXT
        )
    '''

create_products_table = f'''
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY,
            description TEXT,
            article TEXT,
            trade_mark TEXT,
            manufacturer_data TEXT,
            quantity_units INTEGER,
            units TEXT,
            unit_net_weight REAL,
            unit_gross_weight REAL,
            unit_volume REAL,
            unit_invoice REAL,
            quantity_transport_units INTEGER,
            transport_units TEXT,
            total_invoice REAL,
            invoice_currency TEXT,
            total_net_weight REAL,
            total_gross_weight REAL,
            total_volume REAL,
            transport_cost REAL,
            customs_cost REAL
        )
    '''

create_logistic_leg_table = f'''
        CREATE TABLE IF NOT EXISTS logistic_legs (
            id INTEGER PRIMARY KEY,
            order_id INTEGER,
            parthner_id INTEGER,
            departure_address TEXT,
            destination_address TEXT,
            customs_value REAL,
            costs REAL
        )
    '''

create_custom_leg_table = f'''
        CREATE TABLE IF NOT EXISTS customs_legs (
            id INTEGER PRIMARY KEY,
            type TEXT,
            order_id INTEGER,
            parthner_id INTEGER,
            hs_code TEXT,
            customs_value REAL,
            currency TEXT,
            tax_procent REAL,
            vat_procent REAL,
            tax REAL,
            vat REAL
        )
    '''

