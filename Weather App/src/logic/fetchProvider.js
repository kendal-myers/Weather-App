import request from 'superagent-bluebird-promise';

// helper class to simplify request building
export class Builder {
    constructor(method, url) {
        this.request = request(method, url);
    }

    setHeader(header, value) {
        this.request = this.request.set(header, value);

        return this;
    }

    requ(body, accept) {
        this.request = this.request
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(body)
            .accept(accept || 'json')
            .then(
                (resp) => {
                    if (resp.ok) {
                        if ((accept || 'json') !== 'json') {
                            return resp.text;
                        }
                        return resp.body;
                    }
                    console.error('Error while fetching resource: %d: %s', resp.status, resp.statusText || resp.message || 'Unnown Error')
                    return Promise.reject();
                },
                (err) => {
                    console.error('Error while fetching resource: %d: %s', err.status, err.statusText || err.message || 'Unnown Error')
                    return Promise.reject();
                }
            );

        return this;
    }

    build() {
        return this.request;
    }
}

// helper function to simplify api requests
export default function fetch(method, url, body) {
    const promise = () => new Builder(method, url)
        .requ(body)
        .build();

    return promise();
}
