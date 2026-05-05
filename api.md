{
    "info": {
        "name": "Prestest Front End Developer | Gbee Glow Indonesia",
        "description": "Prestest Front End Developer",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [
        {
            "name": "categories",
            "description": "",
            "item": [
                {
                    "name": "GET_ALL_CATEGORY",
                    "description": "",
                    "event": [],
                    "auth": {},
                    "request": {
                        "auth": {},
                        "method": "GET",
                        "body": {},
                        "header": [],
                        "url": {
                            "raw": "{{baseUrl}}/category",
                            "path": [
                                "category"
                            ],
                            "host": [
                                "{{baseUrl}}"
                            ],
                            "query": [
                                {
                                    "key": "search",
                                    "value": "",
                                    "description": "",
                                    "type": "string"
                                }
                            ],
                            "variable": []
                        }
                    },
                    "response": [],
                    "protocolProfileBehavior": {
                        "strictSSL": false,
                        "followRedirects": true
                    }
                },
                {
                    "name": "UPLOAD_IMAGE_CATEGORY",
                    "description": "",
                    "event": [],
                    "auth": {},
                    "request": {
                        "auth": {},
                        "method": "PUT",
                        "body": {
                            "mode": "formdata",
                            "formdata": [
                                {
                                    "key": "image",
                                    "value": "cmMtdXBsb2FkLTE3Nzc1MTQ1NDEzNTYtMTc=/category-side-dish.png",
                                    "type": "file",
                                    "disabled": false
                                }
                            ]
                        },
                        "header": [],
                        "url": {
                            "raw": "{{baseUrl}}/category/upload/5",
                            "path": [
                                "category",
                                "upload",
                                "5"
                            ],
                            "host": [
                                "{{baseUrl}}"
                            ],
                            "query": [],
                            "variable": []
                        }
                    },
                    "response": [],
                    "protocolProfileBehavior": {
                        "strictSSL": false,
                        "followRedirects": true
                    }
                }
            ],
            "event": [
                {
                    "listen": "prerequest",
                    "script": {
                        "exec": [],
                        "type": "text/javascript",
                        "packages": {}
                    }
                },
                {
                    "listen": "test",
                    "script": {
                        "exec": [],
                        "type": "text/javascript",
                        "packages": {}
                    }
                }
            ],
            "auth": {}
        },
        {
            "name": "menus",
            "description": "",
            "item": [
                {
                    "name": "GET_ALL_MENU",
                    "description": "",
                    "event": [],
                    "auth": {},
                    "request": {
                        "auth": {},
                        "method": "GET",
                        "body": {},
                        "header": [],
                        "url": {
                            "raw": "{{baseUrl}}/menu",
                            "path": [
                                "menu"
                            ],
                            "host": [
                                "{{baseUrl}}"
                            ],
                            "query": [
                                {
                                    "key": "page",
                                    "value": "1",
                                    "description": "",
                                    "type": "string"
                                },
                                {
                                    "key": "limit",
                                    "value": "15",
                                    "description": "",
                                    "type": "string"
                                },
                                {
                                    "key": "search",
                                    "value": "",
                                    "description": "",
                                    "type": "string"
                                },
                                {
                                    "key": "category_id",
                                    "value": "",
                                    "description": "",
                                    "type": "string"
                                }
                            ],
                            "variable": []
                        }
                    },
                    "response": [],
                    "protocolProfileBehavior": {
                        "strictSSL": false,
                        "followRedirects": true
                    }
                },
                {
                    "name": "GET_MENU_BY_ID",
                    "description": "",
                    "event": [],
                    "auth": {},
                    "request": {
                        "auth": {},
                        "method": "GET",
                        "body": {},
                        "header": [],
                        "url": {
                            "raw": "{{baseUrl}}/menu/find/1",
                            "path": [
                                "menu",
                                "find",
                                "1"
                            ],
                            "host": [
                                "{{baseUrl}}"
                            ],
                            "query": [],
                            "variable": []
                        }
                    },
                    "response": [],
                    "protocolProfileBehavior": {
                        "strictSSL": false,
                        "followRedirects": true
                    }
                },
                {
                    "name": "GET_MENU_DETAIL_BY_SLUG",
                    "description": "",
                    "event": [],
                    "auth": {},
                    "request": {
                        "auth": {},
                        "method": "GET",
                        "body": {},
                        "header": [],
                        "url": {
                            "raw": "{{baseUrl}}/menu/detail/sate-ayam-madura",
                            "path": [
                                "menu",
                                "detail",
                                "sate-ayam-madura"
                            ],
                            "host": [
                                "{{baseUrl}}"
                            ],
                            "query": [],
                            "variable": []
                        }
                    },
                    "response": [],
                    "protocolProfileBehavior": {
                        "strictSSL": false,
                        "followRedirects": true
                    }
                },
                {
                    "name": "CREATE_MENU",
                    "description": "",
                    "event": [],
                    "auth": {},
                    "request": {
                        "auth": {},
                        "method": "POST",
                        "body": {
                            "mode": "raw",
                            "raw": "{\r\n    \"name\": \"Perkedel Jagung\",\r\n    \"description\": \"Lauk pendamping yang manis dan renyah\",\r\n    \"cooking_duration\": \"20\",\r\n    \"category_id\": \"5\",\r\n    \"ingredients\": [\r\n        { \"description\": \"jagung manis\" },\r\n        { \"description\": \"tepung terigu\" },\r\n        { \"description\": \"seledri\" }\r\n    ],\r\n    \"recipes\": [\r\n        { \"description\": \"pipil jagung dan ulek kasar\", \"sort_number\": \"1\" },\r\n        { \"description\": \"campur dengan tepung, bumbu, dan irisan seledri\", \"sort_number\": \"2\" },\r\n        { \"description\": \"goreng dalam minyak panas hingga keemasan\", \"sort_number\": \"3\" }\r\n    ],\r\n    \"nutritions\": {\r\n        \"calory\": \"140\",\r\n        \"protein\": \"4\",\r\n        \"carbohydrate\": \"18\",\r\n        \"fat\": \"7\"\r\n    }\r\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "header": [],
                        "url": {
                            "raw": "{{baseUrl}}/menu",
                            "path": [
                                "menu"
                            ],
                            "host": [
                                "{{baseUrl}}"
                            ],
                            "query": [],
                            "variable": []
                        }
                    },
                    "response": [],
                    "protocolProfileBehavior": {
                        "strictSSL": false,
                        "followRedirects": true
                    }
                },
                {
                    "name": "UPDATE_MENU",
                    "description": "",
                    "event": [],
                    "auth": {},
                    "request": {
                        "auth": {},
                        "method": "PATCH",
                        "body": {
                            "mode": "raw",
                            "raw": "{\r\n    \"name\": \"Nasi Goreng Udang Mentegaa\",\r\n    \"description\": \"Mantap Puooolll\",\r\n    \"cooking_duration\": \"45\",\r\n    \"category_id\": \"1\",\r\n    \"ingredients\": [\r\n        { \"description\": \"bawang merah halah\" },\r\n        { \"description\": \"bawang putih\" },\r\n        { \"description\": \"cabai\" }\r\n    ],\r\n    \"recipes\": [\r\n        { \"description\": \"masukan bawang merah, bawang putih dan cabai kedalam copper\", \"sort_number\": \"1\" },\r\n        { \"description\": \"haluskan selama 5 menit ya\", \"sort_number\": \"2\" },\r\n        { \"description\": \"tuangkan kedalam wajan\", \"sort_number\": \"3\" }\r\n    ],\r\n    \"nutritions\": {\r\n        \"calory\": \"35\",\r\n        \"protein\": \"10\",\r\n        \"carbohydrate\": \"5\",\r\n        \"fat\": \"0\"\r\n    }\r\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "header": [],
                        "url": {
                            "raw": "{{baseUrl}}/menu/update/1",
                            "path": [
                                "menu",
                                "update",
                                "1"
                            ],
                            "host": [
                                "{{baseUrl}}"
                            ],
                            "query": [],
                            "variable": []
                        }
                    },
                    "response": [],
                    "protocolProfileBehavior": {
                        "strictSSL": false,
                        "followRedirects": true
                    }
                },
                {
                    "name": "DELETE_MENU",
                    "description": "",
                    "event": [],
                    "auth": {},
                    "request": {
                        "auth": {},
                        "method": "DELETE",
                        "body": {},
                        "header": [],
                        "url": {
                            "raw": "{{baseUrl}}/menu/delete/1",
                            "path": [
                                "menu",
                                "delete",
                                "1"
                            ],
                            "host": [
                                "{{baseUrl}}"
                            ],
                            "query": [],
                            "variable": []
                        }
                    },
                    "response": [],
                    "protocolProfileBehavior": {
                        "strictSSL": false,
                        "followRedirects": true
                    }
                },
                {
                    "name": "UPLOAD_IMAGE_MENU",
                    "description": "",
                    "event": [],
                    "auth": {},
                    "request": {
                        "auth": {},
                        "method": "PUT",
                        "body": {
                            "mode": "formdata",
                            "formdata": [
                                {
                                    "key": "image",
                                    "value": "cmMtdXBsb2FkLTE3Nzc1MTQ1NDEzNTYtMjA=/bumbu-sate-madura.jpg",
                                    "type": "file",
                                    "disabled": false
                                }
                            ]
                        },
                        "header": [],
                        "url": {
                            "raw": "{{baseUrl}}/menu/upload/1",
                            "path": [
                                "menu",
                                "upload",
                                "1"
                            ],
                            "host": [
                                "{{baseUrl}}"
                            ],
                            "query": [],
                            "variable": []
                        }
                    },
                    "response": [],
                    "protocolProfileBehavior": {
                        "strictSSL": false,
                        "followRedirects": true
                    }
                }
            ],
            "event": [
                {
                    "listen": "prerequest",
                    "script": {
                        "exec": [],
                        "type": "text/javascript",
                        "packages": {}
                    }
                },
                {
                    "listen": "test",
                    "script": {
                        "exec": [],
                        "type": "text/javascript",
                        "packages": {}
                    }
                }
            ],
            "auth": {}
        },
        {
            "name": "WELCOME",
            "description": "",
            "event": [],
            "auth": {},
            "request": {
                "auth": {},
                "method": "GET",
                "body": {},
                "header": [],
                "url": {
                    "raw": "{{baseUrl}}/welcome",
                    "path": [
                        "welcome"
                    ],
                    "host": [
                        "{{baseUrl}}"
                    ],
                    "query": [],
                    "variable": []
                }
            },
            "response": [],
            "protocolProfileBehavior": {
                "strictSSL": false,
                "followRedirects": true
            }
        }
    ],
    "variable": [],
    "event": [],
    "auth": {}
}