// PubSub.ts
type Callback = (data: any) => void;

class PubSubService {
  private subscribers: { [key: string]: Callback[] } = {};

  subscribe(event: string, callback: Callback): () => void {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);

    // Return unsubscribe function
    return () => {
      this.subscribers[event] = this.subscribers[event].filter(
        (cb) => cb !== callback
      );
    };
  }

  publish(event: string, data: any): void {
    if (!this.subscribers[event]) {
      return;
    }
    this.subscribers[event].forEach((callback) => {
      callback(data);
    });
  }
}

// Export a singleton instance
const PubSub = new PubSubService();
export default PubSub;