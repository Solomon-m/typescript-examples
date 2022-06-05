import { ProjectInput } from './components/project-input';
import { ProjectList } from './components/project-list';
import _ from "lodash";

new ProjectInput();
new ProjectList('active');
new ProjectList('finished');

console.log(_.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
