from functions import create_user, create_order, create_parthner, create_task, get_users_list, get_parthners_list, get_orders_list, get_tasks_list
import random
from faker import Faker
from datetime import datetime, timedelta
fake = Faker()

start_date = datetime(2023, 11, 1)
end_date = datetime(2023, 12, 1)

def generate_random_date(start_date, end_date):
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)
    random_date = start_date + timedelta(days=random_number_of_days)
    return random_date.strftime("%Y-%m-%d")

def generate_random_time():
    random_hour = random.randint(0, 23)
    random_minute = random.randint(0, 59)
    random_time = f"{random_hour:02d}:{random_minute:02d}"
    return random_time

def cf_users(amount):
    checker = 0
    while checker < amount:
        user_data = {
            'email': fake.ascii_free_email(),
            'password': random.randint(1000, 9999)
        }
        create_user(user_data)
        checker += 1

def cf_customers(amount):
    checker = 0
    users_list = get_users_list()
    while checker < amount:
        random_user = random.choice(users_list)
        parthner_data = {
            'user_id': random_user["id"],
            'types': 'customer',
            'name': fake.company(),
            'country': fake.country(),
            'legal_data': fake.address(),
            'bank_data': fake.company(),
            'phone': fake.phone_number(),
            'email': fake.ascii_free_email(),
            'contact_name': fake.name(),
        }
        create_parthner(parthner_data)
        checker += 1


def cf_orders(amount):
    checker = 0
    customers_list = get_parthners_list()
    users_list = get_users_list()
    while checker < amount:
        random_user_id = random.choice(users_list)["id"]
        random_customer_id = random.choice([customer for customer in customers_list if customer.get('user_id') == random_user_id])["id"]
        order_data = {
            'user_id': random_user_id,
            'customer_id': random_customer_id,
            'type_of_contract': random.choice(['import', 'export']),
            'departure_address': fake.address(),
            'destination_address': fake.address(),
            'product_common_description': fake.text(max_nb_chars=10),
            'total_gross_weight': random.randint(100, 20000),
            'total_gross_volume': random.randint(1, 90),
            'incoterms': random.choice(['EXW', 'FOB', 'FCA', 'CPT', 'CIF', 'DDP']),
            'total_invoice_value': random.randint(1000, 100000),
            'invoice_currency': random.choice(['USD', 'EUR', 'ILS', 'CNY', 'RUB']),
            'total_cost': random.randint(1000, 10000),
            'total_revenue': random.randint(1000, 10000),
            'margin': random.randint(100, 1000),
            'date_of_order': generate_random_date(start_date, end_date),
            'order_status': random.choice(['start', 'negotiation', 'shipping', 'completed'])
        }
        create_order(order_data)
        checker += 1

def cf_tasks(amount):
    checker = 0
    users_list = get_users_list()
    orders_list = get_orders_list()
    while checker < amount:
        random_user_id = random.choice(users_list)["id"]
        random_order_id = random.choice([order for order in orders_list if order.get('user_id') == random_user_id])["id"]
        task_data = {
            'user_id': random_user_id,
            'description': fake.text(max_nb_chars=15),
            'order_id': random_order_id,
            'date_of_issue': generate_random_date(start_date, end_date),
            'execution_date': generate_random_date(start_date, end_date),
            'execution_time': generate_random_time(),
            'importance': random.choice(['Critical', 'High', 'Medium', 'Low', 'Negligible']),
            'completed': random.choice([1,0])
        }
        create_task(task_data)
        checker += 1


#cf_users(10)

#cf_customers(40)

#cf_orders(100)

#cf_tasks(1000)
