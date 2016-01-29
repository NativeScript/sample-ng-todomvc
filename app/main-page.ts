import 'reflect-metadata';
import {TextView} from 'ui/text-view';
import {topmost} from 'ui/frame';
import {nativeScriptBootstrap} from 'nativescript-angular/application';
import {Inject, Component, View} from 'angular2/core';
import {TodoStore, Todo} from './services/store';
import {Checkbox} from './checkbox';

@Component({
	selector: 'main',
    providers: [TodoStore],
    directives: [Checkbox],
	template: `
<StackLayout orientation='vertical'>
    <Label text='ng-todo' class='title complete'></Label>
    <StackLayout orientation='vertical'>
        <StackLayout
            *ngFor="#todo of todoStore.todos"
            class="todo-item"
            (tap)="toggleSelected(todo)"
            (doubleTap)="edit(todo)"
            >
                <DockLayout *ngIf="!todo.editing" stretchLastChild="true">
                    <Checkbox [checked]="todo.completed" (tap)="toggleCompletion(todo)"></Checkbox>
                    <Label
                        [class.complete]="todo.completed"
                        [class.incomplete]="!todo.completed"
                        class="todo-text"
                        verticalAlignment="center"
                        minWidth="200"
                        [text]="todo.title"
                        *ngIf="!todo.editing"
                        dock="right"></Label>
                </DockLayout>
                <DockLayout *ngIf="todo.editing" stretchLastChild="true">
                    <TextField
                        #title
                        class="todo-input"
                        verticalAlignment="center"
                        minWidth="200"
                        [text]="todo.title"
                        dock="left"></TextField>
                    <Button text="Done"
                        (tap)="finishEditing(todo, title.text)"
                        dock="right"></Button>
                </DockLayout>
                <StackLayout orientation="horizontal" *ngIf="todo.selected && !todo.editing">
                    <Button [text]="!todo.completed ? 'Complete!' : 'Undo complete'" (tap)="toggleCompletion(todo)"></Button>
                    <Button text="Edit" (tap)="edit(todo)"></Button>
                    <Button text="Delete" (tap)="delete(todo)"></Button>
                </StackLayout>
        </StackLayout>
    </StackLayout>
    <Button class="add-button" text='Add' (tap)='addNew($event)'></Button>
</StackLayout>
`,
})
export class MainPage {
    private  todoStore: TodoStore;

	constructor() {
        this.todoStore = new TodoStore();
        this.todoStore.add("item 1", true);
        this.todoStore.add("item 2", false);
	}

    addNew(eventData) {
        this.todoStore.add("new task", false);
    }

    toggleSelected(todo: Todo) {
        console.log('Selecting: ' + todo.title);
        this.todoStore.select(todo, !todo.selected);
    }

    toggleCompletion(todo: Todo) {
        console.log('toggleCompletion: ' + todo.completed);
        this.todoStore.toggleCompletion(todo);
    }

    delete(todo: Todo) {
        this.todoStore.remove(todo);
    }

    edit(todo: Todo) {
        this.todoStore.startEditing(todo);
    }

    finishEditing(todo: Todo, newTitle: string) {
        this.todoStore.finishEditing(todo, newTitle);
    }
}
