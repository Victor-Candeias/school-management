// ****************************** login ****************************** 
export interface LoginProps {
	email: string;
	password: string;
}

// Interface for the expected response from the API
export interface LoginResponse {
	status: number;
	message: string;
	userId?: string;
	role?: string;
}

// ****************************** register ****************************** 
export interface RegisterProps {
	name: string;
	email: string;
	password: string;
}

export interface RegisterResponse {
	status: number;
	message: string;
}

// ****************************** register ****************************** 

// ****************************** create school ****************************** 
export interface CreateSchoolResponse {
	id: string;
	status: number;
	message: string;
}

export interface SchoolInterface {
    id?: string;
    userId: string,
    schoolId: string;
    code: string;
    name: string;
    address: string;
    cpAddress: string;
    email: string;
    contact: string
    status?: number;
    message?: string;
}

// ****************************** create school ******************************

// ****************************** create year ******************************
export interface CreateYearResponse {
	yearId?: string;
    status: number;
    message: string;
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

// ****************************** create year ******************************






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
    studentAge: string;
    studentName: string;
    studentEmail: string;
    studentContact: string;
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