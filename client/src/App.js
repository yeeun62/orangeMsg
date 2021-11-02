import React, { useState } from "react";
import axios from "axios";

function App() {
	const [inputChange, setInputChange] = useState({
		phone: "",
		msg: "",
	});

	const onChange = (e, key) => {
		setInputChange({ ...inputChange, [key]: e.target.value });
	};

	const sendMsg = async () => {
		try {
			if (inputChange.phone.length && inputChange.msg.length) {
				let msgSend = await axios.post(
					"https://www.apiorange.com/api/send/sms.do",
					{
						sender: process.env.REACT_APP_SENDER,
						phone: inputChange.phone,
						msg: inputChange.msg,
					},
					{
						headers: {
							Authorization: "hP0w+Z5Ng59lXNFL9CZtYw==",
							"Content-Type": "application/json; charset=utf-8",
						},
					}
				);
				if (msgSend.status === 200) {
					window.alert("메세지 발송이 완료되었습니다.");
				}
			} else {
				window.alert("발송번호와 메세지를 모두 입력해주세요.");
			}
		} catch (err) {
			if (err) {
				console.log(err);
				window.alert("메세지 발송에 실패하였습니다.");
			}
		}
	};

	return (
		<div>
			<p>발송자 번호</p>
			<input
				type="text"
				placeholder="발송번호를 입력해주세요."
				onChange={(e) => onChange(e, "phone")}
			/>
			<p>메세지</p>
			<textarea
				style={{ resize: "none" }}
				onChange={(e) => onChange(e, "msg")}
			/>
			<br />
			<button onClick={sendMsg}>문자 보내기</button>
		</div>
	);
}

export default App;
