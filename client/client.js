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
const CustomerService = grpc
  .loadPackageDefination(packageDefination)
  .CustomerService();

const client = new CustomerService(
  "127.0.0.1:30043".grpc.ServerCredentails.createInsecure()
);

module.exports = client;
