import student from "../public/image/sinhvien.png";
import Image from "next/image";
import TopStudent from "./components/chart/topStudent";
import StudentStatus from "./components/chart/studentStatus";
import GenderChart from "./components/chart/gender";
import ClassficationChart from "./components/chart/classficationChart";
export default function Home() {
    const fakedata = [
        {
            name: "Tổng số sinh viên",
            value: 100,
            image: require("../public/image/sinhvien.png"),
        },
        {
            name: "Tổng số khoa",
            value: 100,
            image: require("../public/image/khoa.png"),
        },
        {
            name: "Tổng số lớp",
            value: 100,
            image: require("../public/image/lop.png"),
        },
    ];
    return (
        <div className="flex min-h-screen flex-col w-full p-6">
            <h1 className="text-3xl pt-4 font-bold uppercase">Tổng Quan</h1>
            <div className="flex flex-row gap-8 mt-4 flex-wrap lg:justify-start justify-center">
                {fakedata.map((item) => (
                    <div
                        key={item.name}
                        className="card card-compact w-96 bg-base-200 shadow-xl"
                    >
                        <figure>
                            <Image
                                src={item.image}
                                alt="Shoes"
                                className="h-52 p-4 object-contain"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{item.name}</h2>
                            <p className="font-bold text-5xl">{item.value}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Xem</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <h1 className="text-3xl pt-8 font-bold uppercase">Thống kê</h1>
            <div className="flex flex-row gap-8 flex-wrap">
                <StudentStatus />
                <GenderChart />
                <ClassficationChart />
            </div>
        </div>
    );
}
