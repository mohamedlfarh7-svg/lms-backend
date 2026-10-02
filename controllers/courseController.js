const Course = require('../models/Course');
const Module = require('../models/Module');
const Resource = require('../models/Resource');

const getCourses = async (req, res, next) =>{
    try{
        const { category, level, search, sortBy } = req.query;
        let query = { isPublished: true };
        if(category){
            query.category = category;
        }
        if(level){
            query.level = level;
        }
        if(search){
            const searchPattern = new RegExp(search,'i')
            query.title = searchPattern;
        }
        const sortOrder = sortBy === 'oldest' ? 1 : -1;

        const courses = (await Course.find(query)).sort({createdAt: sortOrder});
        res.status(200).json({ count: courses.length, data: courses });
    }catch(error){
        next(error);
    }
}

const getCourseById = async (req,res,next)=>{
    try{
        const course = await Course.findById(req.params.id).populate({ path: 'modules', sort: 'order' })
        if(!course){
            res.status(404);
            throw new error('course not found')
        }
        res.status(200).json({
            success: true,
            data: course
        });
    }catch(error){
        next(error)
    }
    
}

module.exports = {
  getCourses,
  getCourseById,
};