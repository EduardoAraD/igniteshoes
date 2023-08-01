import OneSignal from "react-native-onesignal";

// export function tagUserEmailCreate(email: string) {
//   // OneSignal.sendTag('user_email', email);
//   // OneSignal.deleteTag('user_email');
// }

export function tagUserInfoCreate() {
  OneSignal.sendTags({
    "user_name": "Eduardo",
    "user_email": "araujocarlos893@gmail.com"
  })
}
