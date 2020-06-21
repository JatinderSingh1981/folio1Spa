export class Student {
    id: string;
    folioClassId: number;
    firstName: string;
    lastName: string;
    age: string;
    gpa: string;

    isDeleting:boolean;
    isEditing:boolean;
}

export class StudentTemplate {
    id: number;
    folioClassId: number;
    firstName: string;
    lastName: string;
    age: number;
    gpa: number;

    isDeleting:boolean;
    isEditing:boolean;
}