import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <aside>
        <nav>
          <ol>
            {/* <Link href={"/events"}>Events</Link>
            <Link href={"/fullDocuments"}>Full Documents</Link>
            <Link href={"/people"}>People</Link>
            <Link href={"/lectureCourses"}>Lecture Courses</Link>
            <Link href={"/adviseClasses"}>Advise Classes</Link> */}
          </ol>
        </nav>
      </aside>
      <main>{children}</main>
    </>
  );
}
