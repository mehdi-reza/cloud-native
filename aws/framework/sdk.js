const Logger = require("../../features/Logger");
const log = new Logger("aws/framework/sdk.js");
// eslint-disable-next-line no-unused-vars
// const AWS_XRAY = require("aws-xray-sdk");
//const _AWS = _AWS_XRAY.captureAWS(require("aws-sdk"));
const AWS = require("aws-sdk");

if (require.main === module)
  throw "SDK cannot be run directly, use require(..) to import";

var _resolvedDependencies = [];
var _options;
var _enableSdkLogging;

var _computeIfAbsent = function (id, options, extensions) {
  const _id = id.toUpperCase();
  if (_resolvedDependencies[_id] === undefined) {
    log.debug("Creating new instance of: ", id.toUpperCase());

    if (extensions && (extensions[id] || extensions[id].toUpperCase())) {
      const creator = extensions[id] || extensions[id].toUpperCase();
      _resolvedDependencies[_id] = creator();
    } else {
      switch (_id) {
        case "DB":
          _resolvedDependencies[_id] = new AWS.DynamoDB.DocumentClient();
          break;
        case "S3":
          _resolvedDependencies[_id] = new AWS.S3();
          break;
        case "IOTDATA":
          _resolvedDependencies[_id] = new AWS.IotData({
            endpoint: options.iotEndpoint,
          });
          break;
        case "IOT":
          _resolvedDependencies[_id] = new AWS.Iot();
          break;
        case "LAMBDA":
          _resolvedDependencies[_id] = new AWS.Lambda();
          break;
        case "SECRETSMANAGER":
          _resolvedDependencies[_id] = new AWS.SecretsManager({endpoint: options.secretEndpoint});
          break;
        default:
          _resolvedDependencies[_id] = new AWS[id]();
      }
    }
  }
  return _resolvedDependencies[_id];
};

class SDK {
  constructor(options) {
    if (!options) throw "cloud-native.AWS cannot be used without options ..";

    this.options = options;
    options.then((o) => {
      log.setLevel(o.logLevel);
      _enableSdkLogging = o.enableSdkLogging || false;
      _options = {
        ...(_enableSdkLogging && { logger: new Logger("aws-sdk") }),
        ...o,
      };
      AWS.config.update(_options); // global update
    });
  }

  require(services, callback, extensions) {
    return this.options.then((o) => {
      const _services = services.map((id, _index) =>
          _computeIfAbsent(id, o, extensions)
      );
      if (callback && callback != null) callback(..._services);
      if (callback === undefined || callback === null) return _services;
    });
  }

  logger(activeModule) {
    let _logger;
    if (activeModule.children) {
      // last folder + / + fileName
      const paths = activeModule.filename.split(/[\\/]/);
      const loggerName = paths.splice(paths.length - 2).join("/");
      _logger = new Logger(loggerName);
    } else _logger = new Logger(activeModule);

    if (!_options) this.options.then((o) => _logger.setLevel(o.logLevel));
    else _logger.setLevel(_options.logLevel);

    return _logger;
  }

  getOptions() {
    return this.options;
  }
}

module.exports = SDK;
