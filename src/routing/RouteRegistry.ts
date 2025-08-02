import type { Module } from '../types/module.types';

class RouteRegistryClass {
  private modules: Module[] = [];

  registerModule(module: Module) {
    this.modules.push(module);
  }

  getModules(): Module[] {
    return this.modules;
  }

  getNavigableRoutes() {
    return this.modules.flatMap(module =>
      module.routes.filter(route => route.navigable)
    );
  }
}

export const RouteRegistry = new RouteRegistryClass();