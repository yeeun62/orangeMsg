import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Wrap = styled.div`
	text-align: center;
	padding: 1rem;

	* {
		margin: 0;
		padding: 0;
		border: none;
		outline: none;
		list-style: none;
		text-decoration: none;
	}

	input {
		border: 3px solid #006495;
		width: 15rem;
		height: 2rem;
		font-size: 1rem;
		padding-left: 0.3rem;
		margin-bottom: 1rem;
	}

	textarea {
		border: 3px solid #006495;
		width: 15.3rem;
		height: 10rem;
		resize: none;
		margin-bottom: 0.7rem;
	}

	p {
		font-size: 1.3rem;
		padding: 0.4rem;
	}

	button {
		width: 6rem;
		height: 2rem;
		font-size: 1rem;
		font-weight: bold;
		background-color: #00adc7;
		border-radius: 0.3rem;
		color: #fff;
	}
`;

const App = () => {
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
		<Wrap>
			<p>발송자 번호</p>
			<input
				type="text"
				placeholder="-를 제외하고 입력해주세요."
				onChange={(e) => onChange(e, "phone")}
			/>
			<p>메세지</p>
			<textarea
				style={{ resize: "none" }}
				onChange={(e) => onChange(e, "msg")}
			/>
			<br />
			<button onClick={sendMsg}>문자 보내기</button>
		</Wrap>
	);
};

export default App;
