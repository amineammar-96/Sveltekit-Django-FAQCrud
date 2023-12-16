FROM python:3

ENV PYTHONUNBUFFERED=1

WORKDIR /yccanleadfaq

COPY requirement.txt /yccanleadfaq/

RUN pip uninstall django

RUN pip install -r requirement.txt

COPY . /yccanleadfaq/

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
