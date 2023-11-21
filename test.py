import unittest
import functions

class TestTuplesToDicts(unittest.TestCase):

    def test_empty_list(self):
        self.assertEqual(functions.tuples_to_dicts([]), {})

    def test_single_tuple(self):
        input_list = [("key", "value")]
        expected_output = {"key": "value"}
        self.assertEqual(functions.tuples_to_dicts(input_list), expected_output)

    def test_multiple_tuples(self):
        input_list = [("key1", "value1"), ("key2", "value2"), ("key3", "value3")]
        expected_output = {"key1": "value1", "key2": "value2", "key3": "value3"}
        self.assertEqual(functions.tuples_to_dicts(input_list), expected_output)

    def test_duplicate_keys(self):
        input_list = [("key", "value1"), ("key", "value2")]
        expected_output = {"key": "value2"}
        self.assertEqual(functions.tuples_to_dicts(input_list), expected_output)

class TestTupleToDict(unittest.TestCase):

    def test_empty_keys_and_tuple(self):
        self.assertEqual(functions.tuple_to_dict([], ()), {})

    def test_empty_keys(self):
        self.assertEqual(functions.tuple_to_dict([], (1, 2, 3)), {})

    def test_empty_tuple(self):
        self.assertEqual(functions.tuple_to_dict(["key1", "key2", "key3"], ()), {})

    def test_matching_keys_and_tuple(self):
        keys = ["key1", "key2", "key3"]
        input_tuple = (1, "value", True)
        expected_output = {"key1": 1, "key2": "value", "key3": True}
        self.assertEqual(functions.tuple_to_dict(keys, input_tuple), expected_output)

    def test_extra_keys(self):
        keys = ["key1", "key2", "key3"]
        input_tuple = (1, "value")
        expected_output = {"key1": 1, "key2": "value", "key3": None}
        self.assertEqual(functions.tuple_to_dict(keys, input_tuple), expected_output)

class TestCreateUserFunction(unittest.TestCase):

    def test_create_user(self):
        user_data = {
            'email': 'test@example.com',
            'password': 'password123'
        }
        user_id = functions.create_user(user_data)
        self.assertIsNotNone(user_id)
        functions.delete_user(user_id)

class TestGetUsersListFunction(unittest.TestCase):

    def test_get_users_list(self):
        users_list = functions.get_users_list()
        self.assertIsInstance(users_list, list)
        self.assertGreater(len(users_list), 0)
        for user in users_list:
            self.assertIsInstance(user, dict)
            self.assertIn('id', user)
            self.assertIn('user_email', user)
            self.assertIn('user_password', user)

class TestCreateOrderFunction(unittest.TestCase):

    def test_create_order(self):
        order_data = {
            'user_id': 7,
            'customer_id': 25,
            'type_of_contract': 'export',
            'departure_address': 'Departure Address',
            'destination_address': 'Destination Address',
            'product_common_description': 'Product Description',
            'total_gross_weight': 100.0,
            'total_gross_volume': 50.0,
            'incoterms': 'FOB',
            'total_invoice_value': 500.0,
            'invoice_currency': 'USD',
            'total_cost': 300.0,
            'total_revenue': 200.0,
            'margin': 100.0,
            'date_of_order': '2023-11-18',
            'order_status': 'start',
        }
        order_id = functions.create_order(order_data)
        self.assertIsNotNone(order_id)
        functions.delete_order(order_id)





if __name__ == '__main__':
    unittest.main()
