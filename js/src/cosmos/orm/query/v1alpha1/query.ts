/* eslint-disable */
import Long from "long";
import { grpc } from "@improbable-eng/grpc-web";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../../google/protobuf/any";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import { BrowserHeaders } from "browser-headers";
import { Timestamp } from "../../../../google/protobuf/timestamp";
import { Duration } from "../../../../google/protobuf/duration";

export const protobufPackage = "cosmos.orm.query.v1alpha1";

/** GetRequest is the Query/Get request type. */
export interface GetRequest {
  /** message_name is the fully-qualified message name of the ORM table being queried. */
  messageName: string;
  /**
   * index is the index fields expression used in orm definitions. If it
   * is empty, the table's primary key is assumed. If it is non-empty, it must
   * refer to an unique index.
   */
  index: string;
  /**
   * values are the values of the fields corresponding to the requested index.
   * There must be as many values provided as there are fields in the index and
   * these values must correspond to the index field types.
   */
  values: IndexValue[];
}

/** GetResponse is the Query/Get response type. */
export interface GetResponse {
  /**
   * result is the result of the get query. If no value is found, the gRPC
   * status code NOT_FOUND will be returned.
   */
  result?: Any;
}

/** ListRequest is the Query/List request type. */
export interface ListRequest {
  /** message_name is the fully-qualified message name of the ORM table being queried. */
  messageName: string;
  /**
   * index is the index fields expression used in orm definitions. If it
   * is empty, the table's primary key is assumed.
   */
  index: string;
  /** prefix defines a prefix query. */
  prefix?: ListRequest_Prefix | undefined;
  /** range defines a range query. */
  range?: ListRequest_Range | undefined;
  /** pagination is the pagination request. */
  pagination?: PageRequest;
}

/** Prefix specifies the arguments to a prefix query. */
export interface ListRequest_Prefix {
  /**
   * values specifies the index values for the prefix query.
   * It is valid to special a partial prefix with fewer values than
   * the number of fields in the index.
   */
  values: IndexValue[];
}

/** Range specifies the arguments to a range query. */
export interface ListRequest_Range {
  /**
   * start specifies the starting index values for the range query.
   * It is valid to provide fewer values than the number of fields in the
   * index.
   */
  start: IndexValue[];
  /**
   * end specifies the inclusive ending index values for the range query.
   * It is valid to provide fewer values than the number of fields in the
   * index.
   */
  end: IndexValue[];
}

/** ListResponse is the Query/List response type. */
export interface ListResponse {
  /** results are the results of the query. */
  results: Any[];
  /** pagination is the pagination response. */
  pagination?: PageResponse;
}

/** IndexValue represents the value of a field in an ORM index expression. */
export interface IndexValue {
  /**
   * uint specifies a value for an uint32, fixed32, uint64, or fixed64
   * index field.
   */
  uint: Long | undefined;
  /**
   * int64 specifies a value for an int32, sfixed32, int64, or sfixed64
   * index field.
   */
  int: Long | undefined;
  /** str specifies a value for a string index field. */
  str: string | undefined;
  /** bytes specifies a value for a bytes index field. */
  bytes: Uint8Array | undefined;
  /** enum specifies a value for an enum index field. */
  enum: string | undefined;
  /** bool specifies a value for a bool index field. */
  bool: boolean | undefined;
  /** timestamp specifies a value for a timestamp index field. */
  timestamp?: Date | undefined;
  /** duration specifies a value for a duration index field. */
  duration?: Duration | undefined;
}

const baseGetRequest: object = { messageName: "", index: "" };

export const GetRequest = {
  encode(message: GetRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.messageName !== "") {
      writer.uint32(10).string(message.messageName);
    }
    if (message.index !== "") {
      writer.uint32(18).string(message.index);
    }
    for (const v of message.values) {
      IndexValue.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetRequest } as GetRequest;
    message.values = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messageName = reader.string();
          break;
        case 2:
          message.index = reader.string();
          break;
        case 3:
          message.values.push(IndexValue.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetRequest {
    const message = { ...baseGetRequest } as GetRequest;
    message.values = [];
    if (object.messageName !== undefined && object.messageName !== null) {
      message.messageName = String(object.messageName);
    } else {
      message.messageName = "";
    }
    if (object.index !== undefined && object.index !== null) {
      message.index = String(object.index);
    } else {
      message.index = "";
    }
    if (object.values !== undefined && object.values !== null) {
      for (const e of object.values) {
        message.values.push(IndexValue.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: GetRequest): unknown {
    const obj: any = {};
    message.messageName !== undefined && (obj.messageName = message.messageName);
    message.index !== undefined && (obj.index = message.index);
    if (message.values) {
      obj.values = message.values.map((e) => (e ? IndexValue.toJSON(e) : undefined));
    } else {
      obj.values = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<GetRequest>): GetRequest {
    const message = { ...baseGetRequest } as GetRequest;
    message.values = [];
    if (object.messageName !== undefined && object.messageName !== null) {
      message.messageName = object.messageName;
    } else {
      message.messageName = "";
    }
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = "";
    }
    if (object.values !== undefined && object.values !== null) {
      for (const e of object.values) {
        message.values.push(IndexValue.fromPartial(e));
      }
    }
    return message;
  },
};

const baseGetResponse: object = {};

export const GetResponse = {
  encode(message: GetResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== undefined) {
      Any.encode(message.result, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetResponse } as GetResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetResponse {
    const message = { ...baseGetResponse } as GetResponse;
    if (object.result !== undefined && object.result !== null) {
      message.result = Any.fromJSON(object.result);
    } else {
      message.result = undefined;
    }
    return message;
  },

  toJSON(message: GetResponse): unknown {
    const obj: any = {};
    message.result !== undefined && (obj.result = message.result ? Any.toJSON(message.result) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GetResponse>): GetResponse {
    const message = { ...baseGetResponse } as GetResponse;
    if (object.result !== undefined && object.result !== null) {
      message.result = Any.fromPartial(object.result);
    } else {
      message.result = undefined;
    }
    return message;
  },
};

const baseListRequest: object = { messageName: "", index: "" };

export const ListRequest = {
  encode(message: ListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.messageName !== "") {
      writer.uint32(10).string(message.messageName);
    }
    if (message.index !== "") {
      writer.uint32(18).string(message.index);
    }
    if (message.prefix !== undefined) {
      ListRequest_Prefix.encode(message.prefix, writer.uint32(26).fork()).ldelim();
    }
    if (message.range !== undefined) {
      ListRequest_Range.encode(message.range, writer.uint32(34).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListRequest } as ListRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messageName = reader.string();
          break;
        case 2:
          message.index = reader.string();
          break;
        case 3:
          message.prefix = ListRequest_Prefix.decode(reader, reader.uint32());
          break;
        case 4:
          message.range = ListRequest_Range.decode(reader, reader.uint32());
          break;
        case 5:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListRequest {
    const message = { ...baseListRequest } as ListRequest;
    if (object.messageName !== undefined && object.messageName !== null) {
      message.messageName = String(object.messageName);
    } else {
      message.messageName = "";
    }
    if (object.index !== undefined && object.index !== null) {
      message.index = String(object.index);
    } else {
      message.index = "";
    }
    if (object.prefix !== undefined && object.prefix !== null) {
      message.prefix = ListRequest_Prefix.fromJSON(object.prefix);
    } else {
      message.prefix = undefined;
    }
    if (object.range !== undefined && object.range !== null) {
      message.range = ListRequest_Range.fromJSON(object.range);
    } else {
      message.range = undefined;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: ListRequest): unknown {
    const obj: any = {};
    message.messageName !== undefined && (obj.messageName = message.messageName);
    message.index !== undefined && (obj.index = message.index);
    message.prefix !== undefined &&
      (obj.prefix = message.prefix ? ListRequest_Prefix.toJSON(message.prefix) : undefined);
    message.range !== undefined &&
      (obj.range = message.range ? ListRequest_Range.toJSON(message.range) : undefined);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<ListRequest>): ListRequest {
    const message = { ...baseListRequest } as ListRequest;
    if (object.messageName !== undefined && object.messageName !== null) {
      message.messageName = object.messageName;
    } else {
      message.messageName = "";
    }
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = "";
    }
    if (object.prefix !== undefined && object.prefix !== null) {
      message.prefix = ListRequest_Prefix.fromPartial(object.prefix);
    } else {
      message.prefix = undefined;
    }
    if (object.range !== undefined && object.range !== null) {
      message.range = ListRequest_Range.fromPartial(object.range);
    } else {
      message.range = undefined;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseListRequest_Prefix: object = {};

export const ListRequest_Prefix = {
  encode(message: ListRequest_Prefix, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.values) {
      IndexValue.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListRequest_Prefix {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListRequest_Prefix } as ListRequest_Prefix;
    message.values = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.values.push(IndexValue.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListRequest_Prefix {
    const message = { ...baseListRequest_Prefix } as ListRequest_Prefix;
    message.values = [];
    if (object.values !== undefined && object.values !== null) {
      for (const e of object.values) {
        message.values.push(IndexValue.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: ListRequest_Prefix): unknown {
    const obj: any = {};
    if (message.values) {
      obj.values = message.values.map((e) => (e ? IndexValue.toJSON(e) : undefined));
    } else {
      obj.values = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ListRequest_Prefix>): ListRequest_Prefix {
    const message = { ...baseListRequest_Prefix } as ListRequest_Prefix;
    message.values = [];
    if (object.values !== undefined && object.values !== null) {
      for (const e of object.values) {
        message.values.push(IndexValue.fromPartial(e));
      }
    }
    return message;
  },
};

const baseListRequest_Range: object = {};

export const ListRequest_Range = {
  encode(message: ListRequest_Range, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.start) {
      IndexValue.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.end) {
      IndexValue.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListRequest_Range {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListRequest_Range } as ListRequest_Range;
    message.start = [];
    message.end = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.start.push(IndexValue.decode(reader, reader.uint32()));
          break;
        case 2:
          message.end.push(IndexValue.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListRequest_Range {
    const message = { ...baseListRequest_Range } as ListRequest_Range;
    message.start = [];
    message.end = [];
    if (object.start !== undefined && object.start !== null) {
      for (const e of object.start) {
        message.start.push(IndexValue.fromJSON(e));
      }
    }
    if (object.end !== undefined && object.end !== null) {
      for (const e of object.end) {
        message.end.push(IndexValue.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: ListRequest_Range): unknown {
    const obj: any = {};
    if (message.start) {
      obj.start = message.start.map((e) => (e ? IndexValue.toJSON(e) : undefined));
    } else {
      obj.start = [];
    }
    if (message.end) {
      obj.end = message.end.map((e) => (e ? IndexValue.toJSON(e) : undefined));
    } else {
      obj.end = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ListRequest_Range>): ListRequest_Range {
    const message = { ...baseListRequest_Range } as ListRequest_Range;
    message.start = [];
    message.end = [];
    if (object.start !== undefined && object.start !== null) {
      for (const e of object.start) {
        message.start.push(IndexValue.fromPartial(e));
      }
    }
    if (object.end !== undefined && object.end !== null) {
      for (const e of object.end) {
        message.end.push(IndexValue.fromPartial(e));
      }
    }
    return message;
  },
};

const baseListResponse: object = {};

export const ListResponse = {
  encode(message: ListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.results) {
      Any.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListResponse } as ListResponse;
    message.results = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.results.push(Any.decode(reader, reader.uint32()));
          break;
        case 5:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListResponse {
    const message = { ...baseListResponse } as ListResponse;
    message.results = [];
    if (object.results !== undefined && object.results !== null) {
      for (const e of object.results) {
        message.results.push(Any.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: ListResponse): unknown {
    const obj: any = {};
    if (message.results) {
      obj.results = message.results.map((e) => (e ? Any.toJSON(e) : undefined));
    } else {
      obj.results = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<ListResponse>): ListResponse {
    const message = { ...baseListResponse } as ListResponse;
    message.results = [];
    if (object.results !== undefined && object.results !== null) {
      for (const e of object.results) {
        message.results.push(Any.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseIndexValue: object = {};

export const IndexValue = {
  encode(message: IndexValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uint !== undefined) {
      writer.uint32(8).uint64(message.uint);
    }
    if (message.int !== undefined) {
      writer.uint32(16).int64(message.int);
    }
    if (message.str !== undefined) {
      writer.uint32(26).string(message.str);
    }
    if (message.bytes !== undefined) {
      writer.uint32(34).bytes(message.bytes);
    }
    if (message.enum !== undefined) {
      writer.uint32(42).string(message.enum);
    }
    if (message.bool !== undefined) {
      writer.uint32(48).bool(message.bool);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(58).fork()).ldelim();
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IndexValue {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseIndexValue } as IndexValue;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uint = reader.uint64() as Long;
          break;
        case 2:
          message.int = reader.int64() as Long;
          break;
        case 3:
          message.str = reader.string();
          break;
        case 4:
          message.bytes = reader.bytes();
          break;
        case 5:
          message.enum = reader.string();
          break;
        case 6:
          message.bool = reader.bool();
          break;
        case 7:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 8:
          message.duration = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): IndexValue {
    const message = { ...baseIndexValue } as IndexValue;
    if (object.uint !== undefined && object.uint !== null) {
      message.uint = Long.fromString(object.uint);
    } else {
      message.uint = undefined;
    }
    if (object.int !== undefined && object.int !== null) {
      message.int = Long.fromString(object.int);
    } else {
      message.int = undefined;
    }
    if (object.str !== undefined && object.str !== null) {
      message.str = String(object.str);
    } else {
      message.str = undefined;
    }
    if (object.bytes !== undefined && object.bytes !== null) {
      message.bytes = bytesFromBase64(object.bytes);
    }
    if (object.enum !== undefined && object.enum !== null) {
      message.enum = String(object.enum);
    } else {
      message.enum = undefined;
    }
    if (object.bool !== undefined && object.bool !== null) {
      message.bool = Boolean(object.bool);
    } else {
      message.bool = undefined;
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = fromJsonTimestamp(object.timestamp);
    } else {
      message.timestamp = undefined;
    }
    if (object.duration !== undefined && object.duration !== null) {
      message.duration = Duration.fromJSON(object.duration);
    } else {
      message.duration = undefined;
    }
    return message;
  },

  toJSON(message: IndexValue): unknown {
    const obj: any = {};
    message.uint !== undefined && (obj.uint = (message.uint || undefined).toString());
    message.int !== undefined && (obj.int = (message.int || undefined).toString());
    message.str !== undefined && (obj.str = message.str);
    message.bytes !== undefined &&
      (obj.bytes = message.bytes !== undefined ? base64FromBytes(message.bytes) : undefined);
    message.enum !== undefined && (obj.enum = message.enum);
    message.bool !== undefined && (obj.bool = message.bool);
    message.timestamp !== undefined && (obj.timestamp = message.timestamp.toISOString());
    message.duration !== undefined &&
      (obj.duration = message.duration ? Duration.toJSON(message.duration) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<IndexValue>): IndexValue {
    const message = { ...baseIndexValue } as IndexValue;
    if (object.uint !== undefined && object.uint !== null) {
      message.uint = object.uint as Long;
    } else {
      message.uint = undefined;
    }
    if (object.int !== undefined && object.int !== null) {
      message.int = object.int as Long;
    } else {
      message.int = undefined;
    }
    if (object.str !== undefined && object.str !== null) {
      message.str = object.str;
    } else {
      message.str = undefined;
    }
    if (object.bytes !== undefined && object.bytes !== null) {
      message.bytes = object.bytes;
    } else {
      message.bytes = undefined;
    }
    if (object.enum !== undefined && object.enum !== null) {
      message.enum = object.enum;
    } else {
      message.enum = undefined;
    }
    if (object.bool !== undefined && object.bool !== null) {
      message.bool = object.bool;
    } else {
      message.bool = undefined;
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = object.timestamp;
    } else {
      message.timestamp = undefined;
    }
    if (object.duration !== undefined && object.duration !== null) {
      message.duration = Duration.fromPartial(object.duration);
    } else {
      message.duration = undefined;
    }
    return message;
  },
};

/** Query is a generic gRPC service for querying ORM data. */
export interface Query {
  /** Get queries an ORM table against an unique index. */
  Get(request: DeepPartial<GetRequest>, metadata?: grpc.Metadata): Promise<GetResponse>;
  /** List queries an ORM table against an index. */
  List(request: DeepPartial<ListRequest>, metadata?: grpc.Metadata): Promise<ListResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Get = this.Get.bind(this);
    this.List = this.List.bind(this);
  }

  Get(request: DeepPartial<GetRequest>, metadata?: grpc.Metadata): Promise<GetResponse> {
    return this.rpc.unary(QueryGetDesc, GetRequest.fromPartial(request), metadata);
  }

  List(request: DeepPartial<ListRequest>, metadata?: grpc.Metadata): Promise<ListResponse> {
    return this.rpc.unary(QueryListDesc, ListRequest.fromPartial(request), metadata);
  }
}

export const QueryDesc = {
  serviceName: "cosmos.orm.query.v1alpha1.Query",
};

export const QueryGetDesc: UnaryMethodDefinitionish = {
  methodName: "Get",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...GetResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const QueryListDesc: UnaryMethodDefinitionish = {
  methodName: "List",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...ListResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

interface UnaryMethodDefinitionishR extends grpc.UnaryMethodDefinition<any, any> {
  requestStream: any;
  responseStream: any;
}

type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;

interface Rpc {
  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any>;
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;

    debug?: boolean;
    metadata?: grpc.Metadata;
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;

      debug?: boolean;
      metadata?: grpc.Metadata;
    },
  ) {
    this.host = host;
    this.options = options;
  }

  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any> {
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata =
      metadata && this.options.metadata
        ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
        : metadata || this.options.metadata;
    return new Promise((resolve, reject) => {
      grpc.unary(methodDesc, {
        request,
        host: this.host,
        metadata: maybeCombinedMetadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function (response) {
          if (response.status === grpc.Code.OK) {
            resolve(response.message);
          } else {
            const err = new Error(response.statusMessage) as any;
            err.code = response.status;
            err.metadata = response.trailers;
            reject(err);
          }
        },
      });
    });
  }
}

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob || ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte));
  }
  return btoa(bin.join(""));
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined | Long;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds.toNumber() * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
