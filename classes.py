

class Order:
    def __init__(self, id, customer_id, customer_name, contact_name, phone, email, type_of_contract, departure_address, destination_address,
                 product_common_description, total_gross_weight, total_gross_volume, incoterms, total_invoice_value, invoice_currency, total_cost,
                 total_revenue, margin, date_of_order, order_status, last_update, last_update_date_time):
        self.id = id
        self.customer_id = customer_id
        self.customer_name = customer_name
        self.contact_name = contact_name
        self.phone = phone
        self.email = email
        self.type_of_contract = type_of_contract
        self.departure_address = departure_address
        self.destination_address = destination_address
        self.product_common_description = product_common_description
        self.total_gross_weight = total_gross_weight
        self.total_gross_volume = total_gross_volume
        self.incoterms = incoterms
        self.total_invoice_value = total_invoice_value
        self.invoice_currency = invoice_currency
        self.total_cost = total_cost
        self.total_revenue = total_revenue
        self.margin = margin
        self.date_of_order = date_of_order
        self.order_status = order_status
        self.last_update = last_update
        self.last_update_date_time = last_update_date_time

class Address:
    def __init__(self, id, zip_code, country, city, rest_data):
        self.id = id
        self.zip_code = zip_code
        self.country = country
        self.city = city
        self.rest_data = rest_data

class Parthner:
    def __init__(self, id, types, name, country, legal_data, bank_data, phone, email, contact_name):
        self.id = id
        self.types = types # customer/contractor/manufaturer
        self.name = name 
        self.country = country
        self.legal_data = legal_data # tax ID/legal name/Address
        self.bank_data = bank_data
        self.phone = phone
        self.email = email
        self.contact_name = contact_name

class Product:
    def __init__(self, id, description, article, trade_mark, manufacturer_data, quantity_units, units, 
                unit_net_weight, unit_gross_weight, unit_volume, unit_invoice, 
                quantity_transport_units, transport_units, total_invoice, invoice_currency, total_net_weight, 
                total_gross_weight, total_volume, transport_cost, customs_cost):
        self.id = id
        self.description = description
        self.article = article
        self.trade_mark = trade_mark
        self.manufacturer_data = manufacturer_data
        self.quantity_units = quantity_units
        self.units = units
        self.unit_net_weight = unit_net_weight
        self.unit_gross_weight = unit_gross_weight
        self.unit_volume = unit_volume
        self.unit_invoice = unit_invoice
        self.quantity_transport_units = quantity_transport_units
        self.transport_units = transport_units
        self.total_invoice = total_invoice
        self.invoice_currency = invoice_currency
        self.total_net_weight = total_net_weight
        self.total_gross_weight = total_gross_weight
        self.total_volume = total_volume
        self.transport_cost = transport_cost
        self.customs_cost = customs_cost

class Logistic_leg:
    def __init__(self, id, order_id, parthner_id, departure_address, destination_address, customs_value, costs):
        self.id = id
        self.order_id = order_id
        self.parthner_id = parthner_id
        self.departure_address = departure_address
        self.destination_address = destination_address
        self.customs_value = customs_value
        self.costs = costs

class Customs_leg:
    def __init__(self, id, type, order_id, parthner_id, hs_code, customs_value, currency, tax_procent, vat_procent, tax, vat):
        self.id = id
        self.type = type # import/export
        self.order_id = order_id
        self.parthner_id = parthner_id
        self.hs_code = hs_code
        self.customs_value = customs_value
        self.currency = currency
        self.tax_procent = tax_procent
        self.vat_procent = vat_procent
        self.tax = tax
        self.vat = vat
        

