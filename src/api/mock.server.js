import { createServer, Model, RestSerializer } from "miragejs";


import { videoLibrary } from "../database";


export default function setupMockServer() {
  createServer({
    serializers: {
      application: RestSerializer
    },
    models: {
      video: Model,
      
    },

    routes() {
      this.namespace = "api";
      this.timing = 3000;
      this.resource("videos");
    },

    seeds(server) {
      videoLibrary.map((item) => {
        server.create("video", {
          ...item
        });
      });
    }
  });
}
