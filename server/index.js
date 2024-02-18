// import the service file
const PROTO_PATH = "../customer.proto";

import grpc from "grpc";
import protoLoader from "@grpc/proto-loader";

// creating the proto defination
const packageDefination = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

// attach the proto defination
const customersProto = grpc.loadPackageDefination(packageDefination);

// create your own grpc server
const server = new grpc.Server();

// eg customer from db

const customers = [
  {
    id: "dfghj",
    name: "Praveen Yadav",
    age: 22,
    address: "bengalore",
  },
  {
    id: "sdfgh",
    name: "Akshay Saini ",
    age: 32,
    address: "uttrakhand",
  },
];

// add the service to the server
server.addService(customersProto.CustomerService.service, {
  // call is equivalent to this
  getAll: (call, callback) => {
    callback(null, { customers });
  },
  get: (call, callback) => {
    let customer = customers.find((n) => n.id === call.request.id);
    if (customer) {
      callback(null, customer);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "not found",
      });
    }
  },
  insert: (call, callback) => {
    let customer = call.request;
    customer.id = Math.random();
    customer.push(customer);
    callback(null, customer);
  },
  update: (call, callback) => {},
  remove: (call, callback) => {},
});

// server running port
server.bind("127.0.0.1:30043", grpc.ServerCredentails.createInsecure());

server.start();
