import Image, { StaticImageData } from "next/image";
import TopStudent from "../components/chart/topStudent";
import StudentStatus from "../components/chart/studentStatus";
import GenderChart from "../components/chart/gender";
import Link from "next/link";
import { getAllStudents } from "../(dashboard)/lib/prisma/student";
import { getAllDepartments } from "../(dashboard)/lib/prisma/department";
import { getAllSpecialized } from "../(dashboard)/lib/prisma/spec";
import SinhVienImg from "../../public/image/sinhvien.png";
import IntructorImg from "../../public/image/gv.png";
import DepartmentImg from "../../public/image/khoa.png";
import SpecImg from "../../public/image/spec.png";
import ClassImg from "../../public/image/lop.png";
import SchoolYearImg from "../../public/image/nk.png";
import { getAllIntructor } from "./lib/prisma/instructor";
import { getAllClasses } from "./lib/prisma/classes";
import { getAllSchoolYear } from "./lib/prisma/schoolyear";
import InstructorLevel from "../components/chart/instructorLevel";
interface DisplayData {
    name: string;
    value: number;
    image: StaticImageData;
    href: string;
}

export default async function Home() {
    const [student, department, specialized, instructor, classes, schoolYear] =
        await Promise.all([
            getAllStudents(),
            getAllDepartments(),
            getAllSpecialized(),
            getAllIntructor(),
            getAllClasses(),
            getAllSchoolYear(),
        ]);
    const displayData: DisplayData[] = [
        {
            name: "Tổng số sinh viên",
            value: student.length,
            image: SinhVienImg,
            href: "/student",
        },
        {
            name: "Tổng số giảng viên",
            value: instructor.length,
            image: IntructorImg,
            href: "/instructor",
        },
        {
            name: "Tổng số khoa",
            value: department.length,
            image: DepartmentImg,
            href: "/department",
        },
        {
            name: "Tổng số chuyên ngành",
            value: specialized.length,
            image: SpecImg,
            href: "/spec",
        },
        {
            name: "Tổng số lớp học",
            value: classes.length,
            image: ClassImg,
            href: "/classes",
        },
        {
            name: "Tổng số niên khoá",
            value: schoolYear.length,
            image: SchoolYearImg,
            href: "/schoolyear",
        },
    ];
    return (
        <div className="flex min-h-screen flex-col w-full p-6">
            <h1 className="text-3xl pt-4 font-bold uppercase">Tổng Quan</h1>
            <div className="flex flex-row gap-8 mt-8 flex-wrap lg:justify-start justify-center">
                {displayData.map((item) => (
                    <div
                        key={item.name}
                        className="card card-compact card-side lg:w-[30%] w-full bg-base-200 shadow-lg "
                    >
                        <figure>
                            <Image
                                src={item.image}
                                alt="Shoes"
                                className="h-44 p-4 object-contain "
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{item.name}</h2>
                            <p className="font-bold text-5xl">{item.value}</p>
                            <div className="card-actions justify-end">
                                <Link
                                    href={item.href}
                                    className="btn btn-accent"
                                >
                                    Xem
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <h1 className="text-3xl mt-16 font-bold uppercase">Thống kê</h1>
            <div className="flex flex-row gap-8 flex-wrap mt-4">
                <StudentStatus />
                <GenderChart />
                {/* <ClassficationChart /> */}
                {/* <TopStudent /> */}
                <InstructorLevel />
            </div>
        </div>
    );
}
