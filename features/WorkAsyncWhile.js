const WorkAsyncWhile = function (work, context) {
  this.context = context;
  this.work = async () => {
    this.context = await work(this.context);
  };
  this.start = async () => {
    let breaker = 0;
    while (!this.context.done || this.context.done !== true) {
      await this.work();
      breaker++;
      if(breaker > 5) {
        console.log("Infinit loop breaker triggered")
        break;
      }
    }
    return this.context
  };
};

module.exports = WorkAsyncWhile;
