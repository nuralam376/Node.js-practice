import { Controller, Get } from "@nestjs/common";

@Controller("/app")
export class AppController {
  @Get("/test")
  getRootRoute() {
    return "Hello nest.js";
  }

  @Get("/:id")
  getTestId() {
    return "id";
  }
}
