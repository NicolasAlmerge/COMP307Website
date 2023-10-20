import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Course } from "../../classes/Course";

class UserInfo {
    userId: string;
    userName: string;
    hours: string;
    location: string;
    duties: string;
};

const OfficeHours = ({course}: {course: Course}) => {
    const [userInfos, setUserInfos] = useState<Array<UserInfo>>([]);

    // Fetch OH infos
    const fetchOHs = async () => {
        let ohs = await fetch("http://127.0.0.1:3000/api/oh/" + course._id);
        if (!ohs) return;
        const ohData = await ohs.json();
        const userInfosTemp: Array<UserInfo> = [];

        for (const oh of ohData) {
            const taRes = await fetch("http://127.0.0.1:3000/api/users/" + oh.user);
            if (!taRes) continue;
            let taData = await taRes.json();
            taData = taData.user;
            const newUserInfo = {
                userId: taData._id,
                userName: taData.firstName + " " + taData.lastName,
                hours: oh.hours,
                location: oh.location,
                duties: oh.duties
            };
            userInfosTemp.push(newUserInfo);
        }

        setUserInfos(userInfosTemp);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {fetchOHs();}, []);

    return (
        <>
          <hr/>
          {
            !userInfos.length? <center>No data for this course.</center>:
            <Table responsive>
              <thead>
                <tr key={0}>
                  <th className="rate-ta-table-header">Name</th>
                  <th className="rate-ta-table-header">Hours</th>
                  <th className="rate-ta-table-header">Location</th>
                  <th className="rate-ta-table-header">Duties</th>
                </tr>
              </thead>
              <tbody>
                {
                  userInfos.map(ta =>
                    <tr key={ta.userId} className="rate-ta-table-row">
                      <td className="rate-ta-table-data">{ta.userName}</td>
                      <td className="rate-ta-table-data">{ta.hours || "Not set"}</td>
                      <td className="rate-ta-table-data">{ta.location || "Not set"}</td>
                      <td className="rate-ta-table-data">{ta.duties || "Not set"}</td>
                    </tr>
                  )
                }
              </tbody>
            </Table>
          }
        </>
    );
}

export default OfficeHours;
