from openai import OpenAI
import os


client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)

with open("./TenderNotice_1.txt", "r") as file:
        notice_text = file.read()
        

messages = [
     {"role": "system", "content": "The following will be the text content of a 'Notice Inviting Tender' for a government project in India. Summarise the contents succinctly and return a JSON object (no newline characters please) that returns a short title in the format of '<name of work - two/three words> at <location of work> ' under the field 'Title', a description of the project, with the following being the broad fields: Title - Name of the project; Description - defining the nature of the work, including defining or expanding any acronyms mentioned in the document. Cost: Estimated cost if present, Tender document cost: Estimated cost of the documents (if present), Completion Period: Completion period(s) if mentioned. Come up with additional fields based on your reading of the content. Use only one level of nesting please."},
     {"role": "user", "content": notice_text}    
  ]



completion = client.chat.completions.create(
  model="gpt-4-1106-preview",
  messages=messages, 
)

print(completion.choices[0].message)


