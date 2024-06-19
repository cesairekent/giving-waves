// CRUD in local storage

class LocalStorageService {

    create(data: string, key: string): void {
        localStorage.setItem(key, data);
    }

    read(key: string): string {
        return localStorage.getItem(key) || '';
    }

    update(data: string, key: string): void {
        localStorage.setItem(key, data);
    }

    delete(key: string): void {
        localStorage.removeItem(key);
    }
}

export default new LocalStorageService();
