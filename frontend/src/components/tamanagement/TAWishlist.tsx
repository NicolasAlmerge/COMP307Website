import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Course } from "../../classes/Course";

class UserInfo {
    userId: string;
    userName: string;
};

const TAWishlist = ({course}: {course: Course}) => {
    const [tas, setTAs] = useState<Array<UserInfo>>([]);

    // Fetch TA infos
    const fetchTAs = async () => {
        const taInfosTemp: Array<UserInfo> = [];

        for (const student of course.tas) {
            const taRes = await fetch("http://127.0.0.1:3000/api/users/" + student);
            if (!taRes) continue;
            let taData = await taRes.json();
            taData = taData.user;
            const newUserInfo = {
                userId: taData._id,
                userName: taData.firstName + " " + taData.lastName
            };
            taInfosTemp.push(newUserInfo);
        }

        setTAs(taInfosTemp);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {fetchTAs();}, []);

    return (
        <>
          <hr/>
          {
            !tas.length? <center>No TAs for this course.</center>:
            <Table responsive>
              <thead>
                <tr key={0}>
                  <th className="rate-ta-table-header">TA</th>
                </tr>
              </thead>
              <tbody>
                {
                  tas.map(ta =>
                    <tr key={ta.userId} className="rate-ta-table-row">
                      <td className="rate-ta-table-data">{ta.userName}</td>
                    </tr>
                  )
                }
              </tbody>
            </Table>
          }
        </>
    );
}

export default TAWishlist;
