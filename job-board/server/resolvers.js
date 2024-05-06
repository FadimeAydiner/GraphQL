import {getJobs,getJob,getJobsByCompany} from './db/jobs.js';
import {getCompany} from './db/companies.js';
import { GraphQLError } from 'graphql';
export const resolvers = {
    Query:{
        job:async(_root,{id})=>{
            const job=await getJob(id);
            if(!job){
                throw new GraphQLError('No job found with id: '+id,{
                    extensions: {
                        code: 'NOT_FOUND',
                    },
                });
            }
            return job;
        },
        jobs: ()=> getJobs(),
        company:async(_root,{id})=>{
            const company=await getCompany(id);
            if(!company){
                throw new GraphQLError('No company found with id: '+id,{
                    extensions: {
                        code: 'NOT_FOUND',
                    },
                });
            
            }
            return company;
        },
    },
    Company:{
        jobs:(company)=>getJobsByCompany(company.id),
    },
    Job:{
            company: (job)=> getCompany(job.companyId),
            date:(job)=> toIsoDate(job.createdAt),
    },
        
        
};

    function toIsoDate(value){
        return value.slice(0,'yyyy-MM-dd'.length);
    }
