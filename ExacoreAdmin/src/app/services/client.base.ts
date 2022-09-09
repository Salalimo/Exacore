
import { environment } from '../../environments/environment';

export class ClientBase {
    protected transformOptions(options: any) {
        options.withCredentials = true;
        return Promise.resolve(options);
    }

    protected getBaseUrl(useless: string) {

        return environment.apiUrl.slice(0, -1);
        
    }
}