/* eslint-disable prettier/prettier */
import { CommonModule } from '@angular/common';
import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PosService } from '@app/modules/pos/pos.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        TranslateModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
    ],
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
    @ViewChild('searchInput') inputBox!: ElementRef<HTMLInputElement>;

    @Input() placeholder = 'Search';
    @Input() set setMe(value: string) {
        this.value = value;
        if (this.value.length > 0) this.isExpanded = true;
        else this.isExpanded = false;
    }

    @Output() search: EventEmitter<string> = new EventEmitter<string>();
    @Output() command: EventEmitter<string> = new EventEmitter<string>();

    @HostListener('window:keydown', ['$event'])
    keyEvent(_event: KeyboardEvent): void {
        // this.isExpanded = true;
        this.inputBox.nativeElement.focus();
    }

    isExpanded = false;
    value = '';
    constructor(private posService: PosService) {}

    clearSelection(): void {
        this.isExpanded = false;
        this.value = '';

        this.searchMe(this.value.trim());
        this.search.emit(this.value);
    }

    toggleSearch(): void {
        this.isExpanded = !this.isExpanded;
        if (this.isExpanded) {
            this.inputBox.nativeElement.focus();
        } else this.value = '';
    }

    onKeyup(event: KeyboardEvent): void {
        const isMeta = [
            'Shift',
            'CapsLock',
            'Meta',
            'Tab',
            'Escape',
            'ArrowLeft',
            'ArrowRight',
        ].includes(event.key);
        if (!isMeta) {
            // if(event.key === ['Tab') return;
            if (event.key === 'Escape' || this.value === '') {
                this.clearSelection();
                return;
            }

            if (this.inputBox.nativeElement.value.length > 0) this.isExpanded = true;
            else this.isExpanded = false;

            if (event.key === 'Enter') {
                this.appCommand(this.value.trim());
                this.command.emit(this.value.trim());
                this.clearSelection();
                return;
            }
            this.searchMe(this.value.trim());
            this.search.emit(this.value.trim());
        }
    }

    searchMe(value: string): void {
        if (/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~0-9]/.test(value)) {
            this.mildCommand(value);
        } else if (value.length > 1) {
            // is alphabets only
            this.posService.filterItems(value);
        } else if (value.length === 0) this.cancelSearch();
    }

    cancelSearch(): void {
        this.posService.filterItems('');
        // this.menuService.getMenuData();
    }

    mildCommand(_command: string): void {
        // if (_command.length === 1) return;
        const lastChar = _command.slice(-1);
        const qty = Number(_command.slice(0, -1));

        if (isNaN(qty) || !qty) return;

        switch (lastChar) {
            case '+':
                this.posService.activeQty.set(qty);
                // this.isExpanded = false;
                this.value = '';
                break;
            case '-':
                this.posService.activeQty.set(-qty);
                // this.isExpanded = false;
                this.value = '';
                break;
            case '*':
                // this.isExpanded = false;
                this.value = '';
                this.posService.order.tableChangeByCode(qty);
        }
    }

    appCommand(_command: string): void {
        const command = _command.slice(0, 3);
        const text = _command.slice(3);
        console.log(command, text);

        switch (command) {
            case '---':
                //clear order all
                this.posService.order.init();
                break;
            case '-':
                //void last item
                this.posService.voidLast();
                break;
            case '///':
                this.posService.order.addComment(text);
                break;
            case '/?':
                // get help
                break;
            default:
                switch (_command) {
                    case '*cancel':
                        this.posService.order.init();

                        break;
                    case '*edit':
                        this.posService.editMode.set(true);
                        break;
                    case '*pay':
                        this.posService.order.init();

                        break;
                }
        }
    }
}

