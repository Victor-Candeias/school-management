export interface SchoolInterface {
    id?: string;
    userId: string,
    schoolId: string;
    code: string;
    name: string;
    address: string;
    email: string;
    contact: string
    status?: number;
    message?: string;
}

export interface YearsInterface {
    _id?: string;    // Optional ID for the year
    userId: string,
    schoolId: string; // ID of the school associated with the year
    yearId: string;
    name: string;   // Year name (e.g., "2023-2024 Academic Year")
    status?: number;
    message?: string;
}

export interface ClassInterface {
    id?: string;
    userId: string,
    schoolId: string,
    yearId: string,
    classId: string,
    className: string;
    classYear: string;
    classLevel: string;
    status?: number;
    message?: string;
}

export interface StudentInterface {
    id?: string;
    userId: string,
    schoolId: string,
    yearId: string,
    classId: string,
    studentsId: string;
    className: string;
    classYear: string;
    classLevel: string;
    studentNumber: string;
    studentName: string;
    studentEmail: string;
    status?: number;
    message?: string;
}

export interface Levels {
    id: string;
    name: string
}

export interface SidebarProps {
	id: string;
	name: string;
    selected: boolean;
    textAlign?: "left" | "right" | "center";
}