import Reactotron, {
	trackGlobalErrors,
	openInEditor,
	overlay,
	asyncStorage,
	networking
} from "reactotron-react-native";
// import { reactotronRedux } from "reactotron-redux";

Reactotron
	.configure({
		name: "MEDIHUB SC TRACKING",
    enabled: __DEV__ ,//eslint-disable-line
		// host: "192.168.1.147",
		//host: "10.0.7.42",//khi muon log tren thiet bi that, dia chi ip tren local chua react server dang chay, khong phai ip dien thoai
		//port: 9090 // khong can thiet lam
	})
	// .use(reactotronRedux({
	// 	except: ["REALM_COURSE_FETCH_SUCCESS", "REALM_COURSE_FETCHING"], // Loại bỏ các Action không cần theo dõi
	// 	isActionImportant: action => action.type === "ACCOUNT_UPDATE_INFO" // Đánh dấu action quan trọng để highlight
	// }))
	.use(trackGlobalErrors())
	.use(openInEditor())
	.use(overlay())
	.use(asyncStorage())
	.use(networking())
	.connect();

console.view = Reactotron;//Thay vì import Reactotron lên các component trước khi dùng thì chỉ cần dùng lệnh console.tron.log();
Reactotron.clear();//Mỗi lần chạy lên thì xoá hết log cũ
