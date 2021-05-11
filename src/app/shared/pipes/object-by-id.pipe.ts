import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'objectByID' })
export class ObjectByIDPipe implements PipeTransform {
    transform(value: string, objects: any, attribute = 'name'): any {
        if (!value) {
            return value;
        }

        let new_value;
        if (objects){
            const results = objects.find(x => x.id === value);
            if (results){
                new_value = results[attribute];
                return new_value;
            }
        }

        return new_value || value;
    }
}
