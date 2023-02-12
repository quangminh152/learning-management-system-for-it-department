/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Announcements = "announcements",
	Classes = "classes",
	Courses = "courses",
	Curriculums = "curriculums",
	Departments = "departments",
	Grades = "grades",
	Majors = "majors",
	PracticeClasses = "practice_classes",
	Registrations = "registrations",
	StudentNotes = "studentNotes",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string

// System fields
export type BaseSystemFields = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: { [key: string]: any }
}

export type AuthSystemFields = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields

// Record types for each collection

export type AnnouncementsRecord = {
	title: string
	content?: string
	timeCreated: IsoDateString
	timeModified: IsoDateString
}

export type ClassesRecord<TlecturerInfo = unknown> = {
	name: string
	course: RecordIdString
	totalSlots: number
	remainingSlots: number
	day: string
	startPeriod: number
	numberOfPeriod: number
	lecturerInfo: null | TlecturerInfo
	room?: string
	durationStart: IsoDateString
	durationEnd: IsoDateString
}

export type CoursesRecord = {
	name: string
	credit: number
	major: RecordIdString
	year?: number
	semester?: number
	isElective?: boolean
	isComplete?: boolean
}

export type CurriculumsRecord = {
	period: number
	content?: string
	class: RecordIdString
	classMaterial?: string
}

export type DepartmentsRecord = {
	name: string
}

export type GradesRecord = {
	gradeInclass: number
	gradeMid: number
	gradeFinal: number
	gradeOverallNumber: number
	gradeOverallLetter?: string
	class: RecordIdString
	student: RecordIdString
}

export type MajorsRecord = {
	name: string
	department: RecordIdString
}

export type PracticeClassesRecord<TlecturerInfo = unknown> = {
	class: RecordIdString
	startPeriod: number
	numberOfPeriod: string
	lecturerInfo?: null | TlecturerInfo
	room?: string
	duration: string
}

export type RegistrationsRecord = {
	student: RecordIdString
	class: RecordIdString
}

export type StudentNotesRecord = {
	curriculum: RecordIdString
	student: RecordIdString
	noteMaterial?: string
}

export type UsersRecord = {
	first_name: string
	avatar?: string
	studentID: string
	last_name: string
	phone?: string
	shcd_dk?: boolean
	shcd_gk1?: boolean
	shcd_gk2?: boolean
	shcd_ck?: boolean
	major: RecordIdString
	englishCertificate?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AnnouncementsResponse = AnnouncementsRecord & BaseSystemFields
export type ClassesResponse<TlecturerInfo = unknown> = ClassesRecord<TlecturerInfo> & BaseSystemFields
export type CoursesResponse = CoursesRecord & BaseSystemFields
export type CurriculumsResponse = CurriculumsRecord & BaseSystemFields
export type DepartmentsResponse = DepartmentsRecord & BaseSystemFields
export type GradesResponse = GradesRecord & BaseSystemFields
export type MajorsResponse = MajorsRecord & BaseSystemFields
export type PracticeClassesResponse<TlecturerInfo = unknown> = PracticeClassesRecord<TlecturerInfo> & BaseSystemFields
export type RegistrationsResponse = RegistrationsRecord & BaseSystemFields
export type StudentNotesResponse = StudentNotesRecord & BaseSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields

export type CollectionRecords = {
	announcements: AnnouncementsRecord
	classes: ClassesRecord
	courses: CoursesRecord
	curriculums: CurriculumsRecord
	departments: DepartmentsRecord
	grades: GradesRecord
	majors: MajorsRecord
	practice_classes: PracticeClassesRecord
	registrations: RegistrationsRecord
	studentNotes: StudentNotesRecord
	users: UsersRecord
}