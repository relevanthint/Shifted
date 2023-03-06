from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import openai

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

class BaseWording(BaseModel):
    baseWording: str
    theme:str
    tone:str
    length:str
    learningObjective:str

# Set your OpenAI API key
openai.api_key = "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"
# Set the model to use (in this case, GPT-3)
model_engine = "text-davinci-003"

def get_prompt(base):
    base_wording = base.baseWording
    theme = base.theme
    tone = base.tone
    length = base.length
    learning_objective = base.learningObjective

    # prompt = f"Base exercise wording: {base_wording}.\n Revamp the wording of the base exercise by shifting the focus to {theme}, with a more {tone} tone and a {length} length, better suited for students that enjoy {interest}."
    prompt = f'''
        Base exercise:
        - Target age: 12 years
        - Learning objective: {learning_objective}
        - Wording: "{base_wording}"
        

        This is a similar exercise to the base exercise that shifts the focus to {theme}, with a more {tone} tone and a long {length}, better suited for students that enjoy {theme}. Incorporate creativity, more details, examples, and real-world applications in {theme}. It is an exercise for an exam.

        Version exercise: 
        - Target age: 14 years
        - Learning objective: {learning_objective}
        - Wording:  
    '''


    return prompt

def get_shifted_wording(prompt):
    gpt3 = openai.Completion.create(
    engine = model_engine,
    prompt = prompt,
    max_tokens = 500,
    temperature = 0.75,
    )

    # Get the response
    shift_wording = gpt3.choices[0].text

    return shift_wording



@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/shiftwording/")
def shift_wording(base:BaseWording):

    prompt = get_prompt(base)
    shifted_wording = get_shifted_wording(prompt)

    return shifted_wording
