import streamlit as st
import json

# Page Config
st.set_page_config(
    page_title="Lumina AI FAQ Assistant",
    page_icon="🤖",
    layout="centered"
)

# CSS
with open("style.css") as f:
    st.markdown(
        f"<style>{f.read()}</style>",
        unsafe_allow_html=True
    )

# Load FAQ
with open("faq_data.json", "r") as file:
    data = json.load(file)

questions = [faq["question"] for faq in data["faqs"]]

faq_dict = {
    faq["question"]: faq["answer"]
    for faq in data["faqs"]
}

# Session State
if "show_answer" not in st.session_state:
    st.session_state.show_answer = False

if "selected_question" not in st.session_state:
    st.session_state.selected_question = None

if "conversation_closed" not in st.session_state:
    st.session_state.conversation_closed = False

# Header
st.markdown("""
<h1>🤖 Lumina AI FAQ Assistant</h1>
<center>
Choose a question and get instant answers
</center>
<br>
""", unsafe_allow_html=True)

# Closed Conversation
if st.session_state.conversation_closed:

    st.success(
        "✅ Conversation Closed. Thank you for using Lumina AI FAQ Assistant."
    )

    st.stop()

# Question Selection
selected = st.selectbox(
    "📌 Select a Question",
    ["Choose a Question"] + questions
)

if selected != "Choose a Question":

    if st.button("Get Answer"):

        st.session_state.selected_question = selected
        st.session_state.show_answer = True

# Answer
if st.session_state.show_answer:

    st.markdown(
        f"""
        <div class="bot-msg">
        <b>❓ Question:</b><br>
        {st.session_state.selected_question}
        <br><br>
        <b>🤖 Answer:</b><br>
        {faq_dict[st.session_state.selected_question]}
        </div>
        """,
        unsafe_allow_html=True
    )

    st.markdown("---")

    st.subheader("Do you have another question?")

    col1, col2 = st.columns(2)

    with col1:
        if st.button("✅ Yes"):

            st.session_state.show_answer = False
            st.rerun()

    with col2:
        if st.button("❌ No"):

            st.session_state.conversation_closed = True
            st.rerun()