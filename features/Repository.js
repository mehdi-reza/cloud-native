class Repository {

    constructor(model, sdk) {
        this.model = model;
        this.sdk = sdk;

        this.docPromise = this.sdk.require(["DB"])
        .then(services => {
            const [db] = services;
            return db
        })
    }

    async save(data) {
        const docClient = await this.docPromise;
        return this.model.getOrm().create(docClient, this.model, data)
    }

    async update(data) {
        const docClient = await this.docPromise;
        return this.model.getOrm().update(docClient, this.model, data)
    }

    async delete(id) {
        const docClient = await this.docPromise;
        return this.model.getOrm().delete(docClient, this.model, id);
    }

    async findById(id) {
        const docClient = await this.docPromise;
        return this.model.getOrm().findById(docClient, this.model, id);
    }
}

module.exports = Repository