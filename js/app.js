jottr = angular.module('jottr', ['jottr.services', 'jottr.controllers', 'jottr.directives', 'monospaced.elastic']);
jottrServices = angular.module('jottr.services', []);
jottrControllers = angular.module('jottr.controllers', ['jottr.services']);
jottrDirectives = angular.module('jottr.directives', []);
