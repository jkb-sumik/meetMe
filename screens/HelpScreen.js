import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import { useEffect, useState } from "react";
import * as MailComposer from "expo-mail-composer";
import * as Print from "expo-print";
import PageContainer from "../components/PageContainer";
import SubmitButton from "../components/SubmitButton";
import colors from "../constants/colors";

export default function HelpScreen() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [subject, setSubject] = useState(undefined);
  const [recipients, setRecipients] = useState(["qba199713@gmail.com"]);
  const [body, setBody] = useState(undefined);

  useEffect(() => {
    async function checkAvailability() {
      const isMailAvailable = await MailComposer.isAvailableAsync();
      setIsAvailable(isMailAvailable);
    }

    checkAvailability();
  }, []);

  const sendMail = async () => {
    MailComposer.composeAsync({
      subject: subject,
      body: body,
      recipients: recipients,
    });
  };

  return (
    <PageContainer style={{ alignItems: "center", paddingTop: 120 }}>
      <View style={styles.emailContainer}>
        <TextInput
          value={subject}
          onChangeText={setSubject}
          placeholder="Subject"
          style={styles.input}
        />
        <TextInput
          value={body}
          onChangeText={setBody}
          multiline={true}
          numberOfLines={8}
          style={{
            ...styles.input,
            marginTop: 10,
            height: 220,
            textAlignVertical: "top",
          }}
        />
        {isAvailable ? (
          <View
            style={{
              position: "absolute",
              bottom: 20,
              width: "100%",
              marginLeft: 20,
            }}
          >
            <SubmitButton
              title="Send Mail"
              onPress={sendMail}
              color={colors.primary500}
            />
          </View>
        ) : (
          // <Button title="Send Mail" onPress={sendMail} />
          <Text>Email not available</Text>
        )}
        <StatusBar style="auto" />
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  emailContainer: {
    position: "relative",
    width: "90%",
    height: 400,
    backgroundColor: "#333",
    padding: 20,
    elevation: 10,
    borderRadius: 20,
  },
  input: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 20,
    backgroundColor: colors.nearlyWhite,
  },
});
