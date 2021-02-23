require('dotenv');

//configurations
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'localhost';
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_DATABASE = process.env.MONGO_DATABASE || 'contaazul';
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET || 'darth-vader';
const JWT_USER_SECRET = process.env.JWT_ADMIN_SECRET || 'luke-skywalker';
const JWT_SYSTEM_SECRET = process.env.JWT_ADMIN_SECRET || 'leia-organa';

const DEFAULT_FIRST_ADMIN_PASSWORD = process.env.DEFAULT_FIRST_ADMIN_PASSWORD || 'the-empire-strikes-back';

//conta azul
const CONTA_AZUL_AUTHORIZE_URL = 'https://api.contaazul.com/auth/authorize';
const CONTA_AZUL_TRADE_CODE_AUTHORIZATION_TOKEN = 'https://api.contaazul.com/oauth2/token';
const CONTA_AZUL_REFRESH_TOKEN = 'https://api.contaazul.com/oauth2/token';

const CONTA_AZUL_PRODUCT_URL = 'https://api.contaazul.com/v1/products';
const CONTA_AZUL_SERVICE_URL = 'https://api.contaazul.com/v1/services';
const CONTA_AZUL_CUSTOMER_URL = 'https://api.contaazul.com/v1/customers';
const CONTA_AZUL_SALE_URL = 'https://api.contaazul.com/v1/sales';

const AVAILABLE_SECTIONS_FIELDS = [
    "sale", "customer", "service", "product"
]

const CONTA_AZUL_SECTIONS = {
    CUSTOMER: 'customer',
    SALE: 'sale',
    SERVICE: 'service',
    PRODUCT: 'product'
}

const AVAILABLE_FIELDS_CONTA_AZUL_BY_SECTION = {
    [CONTA_AZUL_SECTIONS.CUSTOMER]: {
        fields: [
            "name", "company_name", "email", "business_phone", "mobile_phone", "person_type", "document", "identity_document", "state_registration_number", "state_registration_type", "city_registration_number", "date_of_birth", "notes", "contacts", "address"
        ],
        objectFields: [
            "address"
        ],
        arrayFields: [
            "contacts"
        ]
    },
    [CONTA_AZUL_SECTIONS.SALE]: {
        fields: [
            "number", "emission", "status", "customer_id", "products", "services", "discount", "payment", "notes", "shipping_cost"
        ],
        objectFields: [
            "discount", "payment"
        ],
        arrayFields: [
            "products", "services", "payment.installments"
        ]
    },
    [CONTA_AZUL_SECTIONS.SERVICE]: {
        fields: [
            "name", "value", "cost", "code"
        ],
        objectFields: [],
        arrayFields: []
    },
    [CONTA_AZUL_SECTIONS.PRODUCT]: {
        fields: [
            "name", "value", "cost", "code", "barcode", "available_stock", "ncm_code", "cest_code", "net_weight", "gross_weight", "unit_measure"
        ],
        objectFields: [],
        arrayFields: []
    }
}

const RABBITMQ_HOST = process.env.RABBITMQ_HOST || 'localhost';
const RABBITMQ_PORT = process.env.RABBITMQ_PORT || '5672';
const RABBITMQ_VHOST = process.env.RABBITMQ_VHOST || '';
const RABBITMQ_USERNAME = process.env.RABBITMQ_USERNAME || 'guest';
const RABBITMQ_PASSWORD = process.env.RABBITMQ_PASSWORD || 'guest';
const RABBITMQ_EXCHANGE_TO_LISTEN = process.env.RABBITMQ_EXCHANGE_TO_LISTEN || 'contaazul';
const RABBITMQ_QUEUES = {
    [CONTA_AZUL_SECTIONS.CUSTOMER]: process.env.RABBITMQ_QUEUE_CUSTOMER || 'contaazul-customer',
    [CONTA_AZUL_SECTIONS.SALE]: process.env.RABBITMQ_QUEUE_SALE || 'contaazul-sale',
    [CONTA_AZUL_SECTIONS.PRODUCT]: process.env.RABBITMQ_QUEUE_PRODUCT || 'contaazul-product',
    [CONTA_AZUL_SECTIONS.SERVICE]: process.env.RABBITMQ_QUEUE_SERVICE || 'contaazul-service'
}
const RABBITMQ_PREFETCH = process.env.RABBITMQ_PREFETCH || 10;

const LOGS_STATUS = {
    RECEIVED: 0,
    PROCESSED: 1
}


module.exports = {
    PORT,
    MONGO_URL,
    MONGO_DATABASE,
    MONGO_PORT,
    JWT_ADMIN_SECRET,
    JWT_USER_SECRET,
    JWT_SYSTEM_SECRET,
    DEFAULT_FIRST_ADMIN_PASSWORD,
    CONTA_AZUL_AUTHORIZE_URL,
    CONTA_AZUL_TRADE_CODE_AUTHORIZATION_TOKEN,
    CONTA_AZUL_REFRESH_TOKEN,
    AVAILABLE_SECTIONS_FIELDS,
    CONTA_AZUL_SECTIONS,
    CONTA_AZUL_PRODUCT_URL,
    CONTA_AZUL_SERVICE_URL,
    CONTA_AZUL_CUSTOMER_URL,
    CONTA_AZUL_SALE_URL,
    AVAILABLE_FIELDS_CONTA_AZUL_BY_SECTION,
    RABBITMQ_HOST,
    RABBITMQ_PORT,
    RABBITMQ_VHOST,
    RABBITMQ_USERNAME,
    RABBITMQ_PASSWORD,
    RABBITMQ_EXCHANGE_TO_LISTEN,
    RABBITMQ_QUEUES,
    RABBITMQ_PREFETCH,
    LOGS_STATUS
}