import { FunctionComponent, useEffect, useState } from 'react';
import { Job } from './types';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { InlineSpinner } from '@freenow/wave';

const url = 'https://course-api.com/react-tabs-project';
const initialJobsState: Job[] = []

const App: FunctionComponent = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState(initialJobsState);
  const [value, setValue] = useState(0);

  const fetchJobs = async () => {
    const response = await fetch(url);
    const newJobs = await response.json();
    setJobs(newJobs);
    setLoading(false);
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section className="section-loading">
        <InlineSpinner />
      </section>
    );
  }

  const { company, dates, duties, title } = jobs[value]
  return (
    <section className="section">
      <div className="title">
        <h2>experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        {/* {job container} */}
        <div className="btn-container">
          {jobs.map((job, index) => {
            return (
              <button key={job.id} onClick={() => setValue(index)} className={`job-btn ${index === value && 'active-btn'}`}>
                {job.company}
              </button>
            )
          })}
        </div>
        {/* { job info} */}
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((duty, index) => {
            return (<div key={index} className="job-desc">
              <FaAngleDoubleRight className="job-icon" />
              <p>{duty}</p>

            </div>)
          })}
        </article>
      </div>
    </section>
  );

}

export default App;
