import { CreationAttributes, Model, ModelStatic, WhereOptions } from "sequelize";
import { BadRequestError, InternalServerError } from "../utils/error/error";

abstract class BaseRepository<T extends Model>{

    protected model: ModelStatic<T>
    constructor(model : ModelStatic<T>){
        this.model = model
    }

    async create(data: CreationAttributes<T>) : Promise<T>{
        try {
            const record = await this.model.create(data);
            return record;
        } catch (error) {
            throw new InternalServerError("Something went wrong")
        }
    }
    async findById(id:number): Promise<T | null>{
        try {
            const record = await this.model.findByPk(id);
            if(!record){
                return null;
            }
            return record; 
        } catch (error) {
            throw new InternalServerError("Something went wrong")
        }
    }
    
    async findAll(): Promise<T[]>{
        try {
            const records = await this.model.findAll();
            if(!records){
                return [];
            }
            return records; 
        } catch (error) {
           throw new InternalServerError("Something went wrong")
        }
    }
    async delete(whereData: WhereOptions<T>): Promise<void>{
        try {
            const record = await this.model.destroy({
                where: {
                    ...whereData
                }
            });
            if(!record){
                throw new BadRequestError("No record found to delete")
            }
            return; 
        } catch (error) {
            throw new InternalServerError("Something went wrong")
        }
    }
    async update(id: number, data: Partial<T>):Promise<T | null>{
        try {
            const record = await this.model.findByPk(id);
            if(!record){
                return null;
            }
            Object.assign(record, data);
            await record.save();
            return record;
        } catch (error) {
            
            throw new InternalServerError("Something went wrong")
        }
    }
}

export default BaseRepository