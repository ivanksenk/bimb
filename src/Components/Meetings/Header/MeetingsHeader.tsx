interface MeetingsHeaderProps {

}

export const MeetingsHeader: React.FC<MeetingsHeaderProps> = () => {
    return (
        <div className="meeting-header">
            <div className="container">
                <div className="flex header-wrapp">
                    <h3>Список встреч</h3>
                </div>
            </div>

        </div>
    );
};

